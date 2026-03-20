import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logoShort from '../../assets/RD Holdings Logo (Short Logo) 2.png'

const footerLinks = [
  { to: '/#divisions', label: 'Our Divisions' },
  { to: '/#tech', label: 'Proprietary Tech' },
  { to: '/#leadership', label: 'Leadership' },
  { to: '/#contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-16 md:py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/" className="inline-block transition-opacity hover:opacity-90">
            <img
              src={logoShort}
              alt="Red Domino Holdings"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
        <motion.p
          className="mt-12 text-center text-sm text-[#9ca3af]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {year} Red Domino Holdings. All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  )
}
