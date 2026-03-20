import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import logoShort from '../assets/RD Holdings Logo (Short Logo) 2.png'
import { PrecisionPilotDownloads } from '../components/PrecisionPilotDownloads'
import { Seo } from '../components/Seo'
import { SEO_COPY, SITE_NAME } from '../config/site'
import {
  getPrecisionPilotWebEmbedSrc,
  precisionPilotWebApp,
} from '../config/precisionPilot'

/**
 * @param {{ variant: 'production' | 'test' }} props
 */
export function PrecisionPilotWebPage({ variant }) {
  const isTest = variant === 'test'

  const iframeSrc = useMemo(
    () => getPrecisionPilotWebEmbedSrc(variant),
    [variant],
  )

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
    <div className="flex min-h-dvh min-h-screen flex-col bg-[#0a0a0a] text-[#e5e7eb]">
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
            Not for end users — use{' '}
            <Link
              to="/precision-pilot"
              className="font-medium text-amber-300 underline decoration-amber-500/50 underline-offset-2 hover:text-amber-200"
            >
              /precision-pilot
            </Link>{' '}
            for production.
          </span>
        </div>
      ) : null}

      <header
        role="banner"
        className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm"
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
          </nav>
        </div>
      </header>

      {isTest && iframeSrc ? (
        <div
          className="border-b border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-[#9ca3af] md:px-6"
          aria-label="Debug: embedded app URL"
        >
          <span className="text-[#6b7280]">iframe src · </span>
          <span className="break-all text-[#d1d5db]">{iframeSrc}</span>
          {precisionPilotWebApp.testUrlExtraParams?.trim() ? (
            <span className="mt-1 block text-[#6b7280]">
              Extra params from config:{' '}
              <code className="text-[#9ca3af]">
                {precisionPilotWebApp.testUrlExtraParams.trim()}
              </code>
            </span>
          ) : null}
        </div>
      ) : null}

      <main id="site-main" className="flex min-h-0 flex-1 flex-col">
        {iframeSrc ? (
          <iframe
            key={iframeSrc}
            title={isTest ? 'Precision Pilot (test)' : 'Precision Pilot'}
            src={iframeSrc}
            className="h-full w-full min-h-0 flex-1 border-0 bg-black"
            allow="fullscreen; clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
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
        className="border-t border-white/10 px-6 py-6 text-center text-xs text-[#6b7280]"
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
