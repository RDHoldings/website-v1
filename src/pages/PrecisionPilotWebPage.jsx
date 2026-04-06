import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoShort from '../assets/RD Holdings Logo (Short Logo) 2.png'
import { PrecisionPilotDownloads } from '../components/PrecisionPilotDownloads'
import { Seo } from '../components/Seo'
import { SEO_COPY, SITE_NAME } from '../config/site'
import { getPrecisionPilotWebEmbedSrc } from '../config/precisionPilot'
import { resolveSitePath, toAbsoluteSiteUrl } from '../utils/sitePaths'

/**
 * @param {{ variant: 'production' | 'test' }} props
 */
export function PrecisionPilotWebPage({ variant }) {
  const isTest = variant === 'test'

  const iframeSrc = useMemo(
    () => getPrecisionPilotWebEmbedSrc(variant),
    [variant],
  )

  const iframeSrcAbsolute = useMemo(
    () => (iframeSrc ? toAbsoluteSiteUrl(iframeSrc) : null),
    [iframeSrc],
  )

  /** Static console sink (second iframe) — only on test route */
  const consolePanelSrc = useMemo(
    () => toAbsoluteSiteUrl(resolveSitePath('/precision-pilot-test/console-panel.html')),
    [],
  )

  const appIframeRef = useRef(null)
  const consoleIframeRef = useRef(null)
  const pendingConsoleRef = useRef([])
  /** Monotonic line id for Flutter EMBED_PARENT_LOG_BRIDGE JSON posts */
  const bridgeSeqRef = useRef(0)

  const forwardToConsolePanel = useCallback((payload) => {
    const win = consoleIframeRef.current?.contentWindow
    const relay = {
      source: 'flutter-console-relay',
      level: payload.level,
      message: payload.message,
      at: payload.at,
      stack: payload.stack,
      href: payload.href,
      seq: payload.seq,
      category: payload.category,
      durationMs: payload.durationMs,
      extra: payload.extra,
    }
    if (!win) {
      pendingConsoleRef.current.push(relay)
      return
    }
    try {
      win.postMessage(relay, window.location.origin)
    } catch {
      pendingConsoleRef.current.push(relay)
    }
  }, [])

  const flushConsoleQueue = useCallback(() => {
    const win = consoleIframeRef.current?.contentWindow
    if (!win) return
    const q = pendingConsoleRef.current.splice(0)
    q.forEach((row) => {
      try {
        win.postMessage(row, window.location.origin)
      } catch {
        /* ignore */
      }
    })
  }, [])

  useEffect(() => {
    if (!isTest) return undefined

    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return
      const appWin = appIframeRef.current?.contentWindow
      if (!appWin || event.source !== appWin) return

      // Injected browser hooks (console-panel README / debug scripts)
      if (event.data && event.data.source === 'flutter-console') {
        forwardToConsolePanel(event.data)
        return
      }

      // Precision Pilot Flutter (RDHoldings): postMessage(JSON) type precision-pilot-log
      // when built with EMBED_PARENT_LOG_BRIDGE (sync workflow in the app repo)
      let bridged = null
      if (typeof event.data === 'string') {
        try {
          bridged = JSON.parse(event.data)
        } catch {
          return
        }
      } else if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.type === 'precision-pilot-log'
      ) {
        bridged = event.data
      }
      if (!bridged || bridged.type !== 'precision-pilot-log') return

      bridgeSeqRef.current += 1
      const rawLevel = (bridged.level || 'log').toString().toLowerCase()
      const hasErr = Boolean(bridged.error || bridged.stackTrace)
      let level = 'log'
      if (hasErr) level = 'error'
      else if (rawLevel === 'debugprint') level = 'debug'
      else if (rawLevel === 'log') level = 'info'
      else level = rawLevel

      const msg =
        (bridged.message != null ? String(bridged.message) : '') +
        (bridged.error ? `\n${bridged.error}` : '')

      forwardToConsolePanel({
        level,
        message: msg,
        at: bridged.t || new Date().toISOString(),
        stack: bridged.stackTrace ? String(bridged.stackTrace) : '',
        category: 'dart',
        href: '',
        seq: bridgeSeqRef.current,
      })
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [isTest, forwardToConsolePanel])

  const clearForwardedConsole = useCallback(() => {
    const win = consoleIframeRef.current?.contentWindow
    if (!win) return
    try {
      win.postMessage(
        { source: 'flutter-console-relay', action: 'clear' },
        window.location.origin,
      )
    } catch {
      /* ignore */
    }
  }, [])

  const seo = isTest ? SEO_COPY.precisionPilotTest : SEO_COPY.precisionPilot

  const softwareJsonLd = !isTest
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Precision Pilot',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, iOS, Web, Windows',
        description: SEO_COPY.precisionPilot.description,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
      }
    : null

  return (
    <div className="fixed inset-0 z-0 flex flex-col overflow-hidden bg-[#0a0a0a] text-[#e5e7eb]">
      <Seo
        title={seo.title}
        description={seo.description}
        noIndex={isTest}
        jsonLd={softwareJsonLd}
        ogType="website"
      />

      {isTest ? (
        <div
          className="border-b border-amber-500/40 bg-amber-950/90 px-4 py-2 text-center text-sm text-amber-100"
          role="status"
          aria-live="polite"
        >
          <strong className="font-semibold tracking-wide">Pre-release test</strong>
          <span className="mx-2 text-amber-200/80">·</span>
          <span className="text-amber-100/90">
            Not for end users — use the{' '}
            <Link
              to="/precision-pilot"
              className="font-medium text-amber-300 underline decoration-amber-500/50 underline-offset-2 hover:text-amber-200"
            >
              production Precision Pilot shell
            </Link>
            .
          </span>
        </div>
      ) : null}

      <header
        role="banner"
        className="shrink-0 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-3 outline-none transition-opacity hover:opacity-90"
            aria-label="Red Domino Holdings — home"
          >
            <img
              src={logoShort}
              alt=""
              className="h-9 w-auto object-contain"
              decoding="async"
            />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm" aria-label="Precision Pilot">
            <Link
              to="/"
              className="font-medium text-[#9ca3af] transition-colors hover:text-[#f3f4f6]"
            >
              Home
            </Link>
            {!isTest ? (
              <Link
                to="/precision-pilot-test"
                className="rounded-md border border-amber-500/35 bg-amber-950/40 px-2.5 py-1 font-medium text-amber-200/95 transition-colors hover:border-amber-400/50 hover:text-amber-100"
              >
                Open test build
              </Link>
            ) : (
              <Link
                to="/precision-pilot"
                className="font-medium text-[#c49a3a] transition-colors hover:text-[#f2d675]"
              >
                Production shell
              </Link>
            )}
            {iframeSrcAbsolute ? (
              <a
                href={iframeSrcAbsolute}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b7280] underline decoration-white/20 underline-offset-2 hover:text-[#9ca3af]"
              >
                Open app in new tab
              </a>
            ) : null}
            {isTest ? (
              <button
                type="button"
                onClick={clearForwardedConsole}
                className="rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800"
              >
                Clear console
              </button>
            ) : null}
          </nav>
        </div>
      </header>

      {isTest && iframeSrcAbsolute ? (
        <div
          className="shrink-0 border-b border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-[#9ca3af] md:px-6"
          aria-label="Test build: full iframe URL (path plus testUrlExtraParams from config)"
        >
          <span className="text-[#6b7280]">App iframe · </span>
          <span className="break-all text-[#d1d5db]">{iframeSrcAbsolute}</span>
          <span className="mt-1 block text-[#6b7280]">
            Two panes: embedded Flutter app (left) and forwarded <code className="text-[#a1a1aa]">console.*</code>,{' '}
            lifecycle, fetch/XHR, WebSocket, perf hints, Maps checks, and{' '}
            <code className="text-[#a1a1aa]">window.onerror</code> /{' '}
            <code className="text-[#a1a1aa]">unhandledrejection</code> (right). Add{' '}
            <code className="text-[#a1a1aa]">debugVerbose=1</code> or{' '}
            <code className="text-[#a1a1aa]">debugTrace=1</code> to the app URL (see README). DevTools on the left
            iframe still gives full Chrome debugging; this panel is a persistent, shareable log.
          </span>
        </div>
      ) : null}

      <main id="site-main" className="flex min-h-0 min-w-0 flex-1 flex-col">
        {iframeSrcAbsolute ? (
          isTest ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-2 md:flex-row md:gap-3 md:p-3">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col md:max-w-[58%]">
                <p className="mb-1 shrink-0 px-1 text-[10px] font-medium uppercase tracking-wide text-[#6b7280]">
                  App
                </p>
                <iframe
                  ref={appIframeRef}
                  key={iframeSrcAbsolute}
                  title="Precision Pilot (test) — embedded app"
                  src={iframeSrcAbsolute}
                  className="block min-h-[40vh] w-full flex-1 rounded-md border border-white/10 bg-black md:min-h-0"
                  loading="eager"
                  allow="fullscreen; geolocation"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col md:max-w-[42%]">
                <p className="mb-1 shrink-0 px-1 text-[10px] font-medium uppercase tracking-wide text-[#6b7280]">
                  Forwarded console
                </p>
                <iframe
                  ref={consoleIframeRef}
                  title="Precision Pilot (test) — forwarded console output"
                  src={consolePanelSrc}
                  className="block min-h-[35vh] w-full flex-1 rounded-md border border-amber-900/40 bg-[#050505] md:min-h-0"
                  loading="eager"
                  onLoad={flushConsoleQueue}
                />
              </div>
            </div>
          ) : (
            <iframe
              key={iframeSrcAbsolute}
              title="Precision Pilot"
              src={iframeSrcAbsolute}
              className="block h-full min-h-0 w-full flex-1 border-0 bg-black"
              loading="eager"
              allow="fullscreen; geolocation"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <h1
              className="mb-3 text-2xl font-bold tracking-tight text-[#f3f4f6] md:text-3xl"
              style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
            >
              Precision Pilot{isTest ? ' — test shell' : ''}
            </h1>
            <p className="mb-6 text-[#9ca3af]">
              {isTest
                ? 'Point the test shell at your staging web client by setting testEmbedUrl in src/config/precisionPilot.js (precisionPilotWebApp). Optional URL params for feature flags: testUrlExtraParams.'
                : 'Point this page at your production web client by setting productionEmbedUrl in src/config/precisionPilot.js (precisionPilotWebApp). Until then, downloads and marketing links below still work.'}
            </p>
            <div className="mb-10 rounded-lg border border-white/10 bg-[#111111]/80 p-5 text-sm text-[#d1d5db]">
              <p className="mb-2 font-medium text-[#f3f4f6]">Config keys</p>
              <ul className="list-inside list-disc space-y-1 text-[#9ca3af]">
                <li>
                  <code className="text-[#c49a3a]">precisionPilotWebApp.productionEmbedUrl</code>{' '}
                  — used on <code className="text-[#9ca3af]">/precision-pilot</code>
                </li>
                <li>
                  <code className="text-[#c49a3a]">precisionPilotWebApp.testEmbedUrl</code>{' '}
                  — used on <code className="text-[#9ca3af]">/precision-pilot-test</code>
                </li>
                <li>
                  <code className="text-[#c49a3a]">precisionPilotWebApp.testUrlExtraParams</code>{' '}
                  — appended to the test iframe only (e.g. <code className="text-[#9ca3af]">debug=1</code>)
                </li>
              </ul>
            </div>
            <PrecisionPilotDownloads />
          </div>
        )}
      </main>

      <footer
        className="shrink-0 border-t border-white/10 px-6 py-6 text-center text-xs text-[#6b7280]"
        role="contentinfo"
      >
        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Footer">
          <Link to="/privacy" className="hover:text-[#9ca3af]">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link to="/terms" className="hover:text-[#9ca3af]">
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  )
}
