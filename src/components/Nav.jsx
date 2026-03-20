import { motion } from 'framer-motion'

const navLinks = [
  { href: '#divisions', label: 'Our Divisions' },
  { href: '#tech', label: 'Proprietary Tech' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact', label: 'Contact' },
]

export function Nav({ className = '' }) {
  return (
    <nav
      className={`flex items-center justify-center gap-8 md:gap-12 ${className}`}
      aria-label="Primary"
    >
      {navLinks.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          className="text-sm md:text-base text-[#f3f4f6]/90 hover:text-[#f3f4f6] transition-colors duration-200 relative group"
          whileHover={{ y: -2 }}
        >
          {link.label}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[linear-gradient(to_top,#c49a3a,#f2d675)] group-hover:w-full transition-all duration-300" />
        </motion.a>
      ))}
    </nav>
  )
}
