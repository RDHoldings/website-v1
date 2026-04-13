import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Globe, Laptop, Smartphone, TabletSmartphone } from 'lucide-react'
import { getPrecisionPilotPlatforms, precisionPilot } from '../config/precisionPilot'
import { fadeUp, staggerContainer } from '../utils/animations'
import { resolveSitePath } from '../utils/sitePaths'

const platformIcons = {
  android: Smartphone,
  ios: TabletSmartphone,
  web: Globe,
  windows: Laptop,
}

function isHttpUrl(url) {
  return /^https?:\/\//i.test(url)
}

function LearnMoreLink({ href, label, className }) {
  const mailto = href.startsWith('mailto:')
  const externalHttp = isHttpUrl(href)
  const internal = href.startsWith('/') && href.length > 1 && !mailto

  const classes =
    className ??
    'inline-flex items-center gap-1.5 text-sm font-semibold text-[#c49a3a] transition-colors hover:text-[#f2d675] underline-offset-4 hover:underline'

  const showOutboundIcon = externalHttp || mailto

  if (internal) {
    return (
      <Link to={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...(externalHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
      {showOutboundIcon ? <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden /> : null}
    </a>
  )
}

function PlatformCard({ platform }) {
  const Icon = platformIcons[platform.id] ?? Smartphone
  const showStore = Boolean(platform.storeUrl)

  const showFile =
    platform.enabled &&
    Boolean(platform.fileUrl) &&
    (platform.fileUrl.startsWith('/') || isHttpUrl(platform.fileUrl))

  const isAvailable = showStore || showFile

  const fileIsRemote = platform.fileUrl && isHttpUrl(platform.fileUrl)
  const fileIsInternalPath = platform.fileUrl?.startsWith('/')
  const isWebApp =
    platform.id === 'web' && (fileIsRemote || Boolean(fileIsInternalPath))
  const fileLabel = isWebApp ? 'Open web app' : 'Download'

  const downloadHref =
    showFile && fileIsInternalPath && !isWebApp ? resolveSitePath(platform.fileUrl) : platform.fileUrl

  const primaryFileOnly = showFile && !showStore
  const FileActionIcon = isWebApp ? Globe : Download

  const fileButtonClass = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
    primaryFileOnly
      ? 'bg-gradient-gold text-[#0a0a0a] hover:opacity-90'
      : 'border border-[#c49a3a]/40 text-[#f3f4f6] hover:bg-[#c49a3a]/10'
  }`

  return (
    <div className="flex flex-col rounded-xl border border-[#c49a3a]/20 bg-[#111111]/60 p-5 transition-colors hover:border-[#c49a3a]/35">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c49a3a]/10 text-[#c49a3a]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold text-[#f3f4f6]">{platform.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-[#9ca3af]">{platform.description}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        {showStore && (
          <a
            href={platform.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
          >
            {platform.storeLabel ?? 'View in store'}
            <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          </a>
        )}

        {showFile && fileIsInternalPath && isWebApp ? (
          <Link to={platform.fileUrl} className={fileButtonClass}>
            <FileActionIcon
              className={`h-4 w-4 shrink-0 ${primaryFileOnly ? 'opacity-90' : ''}`}
              aria-hidden
            />
            {fileLabel}
          </Link>
        ) : null}

        {showFile && !(fileIsInternalPath && isWebApp) ? (
          <a
            href={downloadHref}
            {...(fileIsRemote
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : { download: true })}
            className={fileButtonClass}
          >
            <FileActionIcon
              className={`h-4 w-4 shrink-0 ${primaryFileOnly ? 'opacity-90' : ''}`}
              aria-hidden
            />
            {fileLabel}
            {fileIsRemote && !primaryFileOnly ? (
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            ) : null}
          </a>
        ) : null}

        {!isAvailable && (
          <p className="text-center text-xs font-medium uppercase tracking-wide text-[#6b7280]">
            Coming soon
          </p>
        )}

        {import.meta.env.DEV && !isAvailable && platform.fileUrl && (
          <code className="break-all rounded bg-black/40 px-2 py-1.5 text-[10px] leading-snug text-[#6b7280]">
            {platform.fileUrl}
            {' · '}set <span className="text-[#9ca3af]">enabled: true</span> when ready
          </code>
        )}
      </div>
    </div>
  )
}

/**
 * @param {{ variant?: 'production' | 'test' }} props
 */
export function PrecisionPilotDownloads({ variant = 'production' }) {
  const { downloadsHeading, downloadsSubtext } = precisionPilot
  const platforms = useMemo(() => getPrecisionPilotPlatforms(variant), [variant])

  return (
    <motion.div
      className="mt-20 border-t border-white/10 pt-16 md:mt-24 md:pt-20"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.h3
        className="text-center text-xl font-bold text-[#f3f4f6] md:text-2xl"
        style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
        variants={fadeUp}
      >
        {downloadsHeading}
      </motion.h3>
      <motion.p
        className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#9ca3af] md:text-base"
        variants={fadeUp}
      >
        {downloadsSubtext}
      </motion.p>

      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
      >
        {platforms.map((platform) => (
          <motion.div key={platform.id} variants={fadeUp}>
            <PlatformCard platform={platform} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export function PrecisionPilotAudience({ className = '' }) {
  const { audienceLine, learnMore } = precisionPilot

  return (
    <motion.div className={className} variants={fadeUp}>
      <p className="border-l-2 border-[#c49a3a]/60 pl-4 text-base leading-relaxed text-[#d1d5db]">
        {audienceLine}
      </p>
      <p className="mt-4">
        <LearnMoreLink href={learnMore.href} label={learnMore.label} />
      </p>
    </motion.div>
  )
}
