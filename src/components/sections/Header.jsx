import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Nav } from '../Nav'
import logoLong from '../../assets/RD Holdings Logo.png'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <motion.div
          className="block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="block outline-none" aria-label="Red Domino Holdings — home">
            <img
              src={logoLong}
              alt=""
              className="h-12 md:h-16 w-auto object-contain"
              decoding="async"
            />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Nav />
        </motion.div>
      </div>
    </motion.header>
  )
}
