import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// App screenshots only (excludes logos/hero in src/assets). Order = alphabetical.
// Add files: `Screenshot_*.png` in src/assets, or any PNG in src/assets/precision-pilot/
const screenshotModules = import.meta.glob(
  ['../assets/Screenshot_*.png', '../assets/precision-pilot/*.png'],
  { eager: true },
)
const SCREENSHOTS = Object.keys(screenshotModules)
  .sort()
  .map((path) => screenshotModules[path].default)

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Auto-advance every `intervalMs` (use minMs=maxMs); disabled when `paused` or ≤1 image */
function useScreenshotRotation(count, paused, intervalMs = 7000) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (paused || count <= 1) return undefined

    let cancelled = false

    const scheduleNext = () => {
      timeoutRef.current = window.setTimeout(() => {
        if (cancelled) return
        setIndex((i) => (i + 1) % count)
        scheduleNext()
      }, intervalMs)
    }

    scheduleNext()

    return () => {
      cancelled = true
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current)
    }
  }, [count, paused, intervalMs])

  return index
}

/**
 * Samsung Galaxy Ultra–style device frame (titanium shell, rounded corners,
 * centered punch-hole) with auto-rotating app screenshots.
 */
export function PrecisionPilotDevice() {
  const count = SCREENSHOTS.length
  const reducedMotion = useReducedMotion()
  const index = useScreenshotRotation(count, reducedMotion, 7000)
  const currentSrc = count > 0 ? SCREENSHOTS[index] : null

  const imgClass =
    'precision-pilot-screen-img absolute inset-0 h-full w-full object-contain object-top'

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[261px] flex-col items-center justify-center sm:max-w-[285px] md:max-w-[310px]"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <figure
        className="relative aspect-[9/19.8] w-full select-none"
        aria-label="Precision Pilot app preview in a phone frame"
      >
        {/* Titanium-style outer shell */}
        <div
          className="absolute inset-0 rounded-[2.85rem] p-[10px] shadow-2xl"
          style={{
            background:
              'linear-gradient(145deg, #8a8a90 0%, #4d4d52 28%, #6b6b70 52%, #3d3d42 78%, #76767c 100%)',
            boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.22),
            inset 0 -2px 6px rgba(0,0,0,0.35),
            0 32px 64px -16px rgba(0,0,0,0.65),
            0 0 0 1px rgba(0,0,0,0.4)
          `,
          }}
        >
          {/* Side keys (Ultra-style) */}
          <div
            className="absolute -left-[3px] top-[22%] h-14 w-[3px] rounded-l-sm opacity-90"
            style={{
              background: 'linear-gradient(180deg, #5a5a5e, #3a3a3e)',
              boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.12)',
            }}
            aria-hidden
          />
          <div
            className="absolute -left-[3px] top-[38%] h-20 w-[3px] rounded-l-sm opacity-90"
            style={{
              background: 'linear-gradient(180deg, #5a5a5e, #3a3a3e)',
              boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.12)',
            }}
            aria-hidden
          />
          <div
            className="absolute -right-[3px] top-[30%] h-24 w-[3px] rounded-r-sm opacity-90"
            style={{
              background: 'linear-gradient(180deg, #4a4a4e, #2f2f32)',
              boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.08)',
            }}
            aria-hidden
          />

          {/* Inner bezel + display */}
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.35rem] bg-black ring-1 ring-black/80">
            {/* Status / punch-hole strip */}
            <div className="relative z-10 flex h-[28px] shrink-0 items-end justify-center bg-black pb-1">
              <div
                className="h-[11px] w-[11px] rounded-full bg-[#0a0a0a] ring-1 ring-white/10"
                aria-hidden
              />
            </div>

            {/* Screen content */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
              {currentSrc ? (
                reducedMotion ? (
                  <img
                    src={currentSrc}
                    alt=""
                    className={imgClass}
                    draggable={false}
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={`${currentSrc}-${index}`}
                      src={currentSrc}
                      alt=""
                      className={imgClass}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      draggable={false}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                    />
                  </AnimatePresence>
                )
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="text-xs font-medium text-white/50">Precision Pilot</p>
                  <p className="text-[11px] leading-relaxed text-white/35">
                    Add PNGs named{' '}
                    <code className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-[#c49a3a]/90">
                      Screenshot_*.png
                    </code>{' '}
                    in <code className="rounded bg-white/10 px-1 py-0.5 text-[10px]">src/assets</code>, or
                    place files in{' '}
                    <code className="rounded bg-white/10 px-1 py-0.5 text-[10px]">precision-pilot/</code>.
                    Order is alphabetical.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subtle glass edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2.85rem] ring-1 ring-inset ring-white/[0.07]"
          aria-hidden
        />
      </figure>

      <p className="mt-6 text-center text-sm font-medium text-white/80">Precision Pilot</p>
    </motion.div>
  )
}
