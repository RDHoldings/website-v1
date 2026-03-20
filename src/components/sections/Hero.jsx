import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero"
    >
      {/* Decorative background video — no audio; add hero-video.mp4 to public/ */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        tabIndex={-1}
        aria-hidden
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60" aria-hidden />
      {/* Geometric / particle-style background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(57,0,0,0.03)_50%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#990000]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c49a3a]/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-[15%] w-2 h-2 rounded-full bg-[#c49a3a]/40"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 left-[20%] w-1 h-1 rounded-full bg-[#990000]/40"
          animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-40 right-[25%] w-2 h-2 rounded-full bg-[#f2d675]/30"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[#f3f4f6]">Strategic Scaling.</span>
          <span className="block bg-gradient-gold bg-clip-text text-transparent">Infinite Potential.</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Red Domino Holdings is a premier management firm architecting the future of logistics, transportation, and digital media through proprietary technology and aggressive market expansion.
        </motion.p>
      </motion.div>
    </section>
  )
}
