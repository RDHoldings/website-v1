import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoShort from '../assets/RD Holdings Logo (Short Logo) 2.png'

export function LegalPageLayout({ title, children, updated }) {
  const year = new Date().getFullYear()

  useEffect(() => {
    document.title = `${title} | Red Domino Holdings`
  }, [title])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e7eb]">
      <header className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-6">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src={logoShort}
              alt="Red Domino Holdings"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-[#c49a3a] transition-colors hover:text-[#f2d675]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <h1
          className="mb-2 text-2xl font-bold tracking-tight text-[#f3f4f6] md:text-3xl"
          style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
        >
          {title}
        </h1>
        {updated ? (
          <p className="mb-10 text-sm text-[#9ca3af]">Last updated: {updated}</p>
        ) : null}

        <div className="legal-prose space-y-8 text-sm leading-relaxed text-[#d1d5db] md:text-base">
          {children}
        </div>
      </article>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center text-sm text-[#9ca3af] sm:flex-row sm:justify-between sm:text-left">
          <p>© {year} Red Domino Holdings. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#f3f4f6]">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#f3f4f6]">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[#f3f4f6]">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
