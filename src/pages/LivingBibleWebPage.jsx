import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import logoShort from '../assets/RD Holdings Logo (Short Logo) 2.png'
import { Seo } from '../components/Seo'
import { getLivingBibleWebEmbedSrc } from '../config/livingBible'
import { SEO_COPY } from '../config/site'
import { toAbsoluteSiteUrl } from '../utils/sitePaths'

/**
 * @param {{ variant: 'production' | 'test' }} props
 */
export function LivingBibleWebPage({ variant }) {
  const isTest = variant === 'test'
  const iframeSrc = useMemo(() => getLivingBibleWebEmbedSrc(variant), [variant])
  const iframeSrcAbsolute = useMemo(
    () => (iframeSrc ? toAbsoluteSiteUrl(iframeSrc) : null),
    [iframeSrc],
  )
  const seo = isTest ? SEO_COPY.livingBibleTest : SEO_COPY.livingBible

  return (
    <div className="fixed inset-0 z-0 flex flex-col overflow-hidden bg-[#0a0a0a] text-[#e5e7eb]">
      <Seo title={seo.title} description={seo.description} noIndex={isTest} />
      {isTest ? (
        <div className="border-b border-amber-500/40 bg-amber-950/90 px-4 py-2 text-center text-sm text-amber-100">
          <strong className="font-semibold tracking-wide">Pre-release test</strong>
          <span className="mx-2 text-amber-200/80">·</span>
          <span className="text-amber-100/90">
            Not for public indexing — use{' '}
            <Link
              to="/living-bible"
              className="font-medium text-amber-300 underline decoration-amber-500/50 underline-offset-2 hover:text-amber-200"
            >
              production Living Bible shell
            </Link>
            .
          </span>
        </div>
      ) : null}

      <header className="shrink-0 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3 outline-none transition-opacity hover:opacity-90" aria-label="Red Domino Holdings — home">
            <img src={logoShort} alt="" className="h-9 w-auto object-contain" decoding="async" />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm" aria-label="Living Bible">
            <Link to="/" className="font-medium text-[#9ca3af] transition-colors hover:text-[#f3f4f6]">
              Home
            </Link>
            {!isTest ? (
              <Link
                to="/living-bible-test"
                className="rounded-md border border-amber-500/35 bg-amber-950/40 px-2.5 py-1 font-medium text-amber-200/95 transition-colors hover:border-amber-400/50 hover:text-amber-100"
              >
                Open test build
              </Link>
            ) : (
              <Link to="/living-bible" className="font-medium text-[#c49a3a] transition-colors hover:text-[#f2d675]">
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
          </nav>
        </div>
      </header>

      <main id="site-main" className="flex min-h-0 min-w-0 flex-1 flex-col">
        {iframeSrcAbsolute ? (
          <iframe
            key={iframeSrcAbsolute}
            title={isTest ? 'Living Bible (test)' : 'Living Bible'}
            src={iframeSrcAbsolute}
            className="block h-full min-h-0 w-full flex-1 border-0 bg-black"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#f3f4f6] md:text-3xl">
              Living Bible{isTest ? ' — test shell' : ''}
            </h1>
            <p className="text-[#9ca3af]">
              Set <code className="text-[#c49a3a]">productionEmbedUrl</code> and{' '}
              <code className="text-[#c49a3a]">testEmbedUrl</code> in{' '}
              <code className="text-[#c49a3a]">src/config/livingBible.js</code> to activate embed targets.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
