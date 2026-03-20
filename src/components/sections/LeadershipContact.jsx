import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../utils/animations'

const CONTACT_EMAIL = 'info@reddominoholdings.com'
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Inquiry%20from%20reddominoholdings.com`

export function LeadershipContact() {
  return (
    <>
      <section
        id="leadership"
        className="scroll-mt-28 border-t border-white/10 bg-[#0a0a0a] px-6 py-24 md:py-32"
        aria-labelledby="leadership-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2
              id="leadership-heading"
              className="mb-4 text-center text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
              variants={fadeUp}
            >
              Leadership
            </motion.h2>
            <motion.p
              className="mx-auto mb-10 max-w-2xl text-center text-[#9ca3af]"
              variants={fadeUp}
            >
              Red Domino Holdings is led by operators focused on disciplined growth across logistics,
              equipment, media, and proprietary software—with alignment between capital deployment and
              long-term portfolio value.
            </motion.p>
            <motion.p
              className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[#d1d5db] md:text-base"
              variants={fadeUp}
            >
              For partnership, media, or enterprise inquiries, use{' '}
              <a
                href={CONTACT_MAILTO}
                className="font-medium text-[#c49a3a] underline decoration-[#c49a3a]/40 underline-offset-2 transition-colors hover:text-[#f2d675]"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-28 border-t border-white/10 bg-[#111111] px-6 py-24 md:py-32"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mx-auto max-w-xl rounded-xl border border-[#c49a3a]/25 bg-[#0a0a0a]/80 p-8 text-center md:p-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2
              id="contact-heading"
              className="mb-3 text-2xl font-bold text-[#f3f4f6] md:text-3xl"
              style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
            >
              Contact
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-[#9ca3af] md:text-base">
              Reach the Red Domino Holdings team for general inquiries, Precision Pilot, logistics
              operations, or media partnerships.
            </p>
            <a
              href={CONTACT_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-8 py-3 text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              Email {CONTACT_EMAIL}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
