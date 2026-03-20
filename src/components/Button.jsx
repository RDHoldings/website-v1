import { motion } from 'framer-motion'

export function Button({ children, variant = 'gold', href, className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded transition-all duration-300'
  const variants = {
    gold: 'bg-gradient-gold text-[#0a0a0a] hover:opacity-90 hover:scale-[1.02]',
    crimson: 'bg-gradient-crimson text-[#f3f4f6] hover:opacity-90 hover:scale-[1.02]',
    outline: 'border border-[#c49a3a]/50 text-[#f3f4f6] hover:bg-[#c49a3a]/10',
  }

  const combinedClassName = `${baseStyles} ${variants[variant] || variants.gold} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
