import { motion } from 'framer-motion'
import { BarChart3, Route, Shield, Wallet } from 'lucide-react'
import { PrecisionPilotDevice } from '../PrecisionPilotDevice'
import { PrecisionPilotAudience } from '../PrecisionPilotDownloads'
import { staggerContainer, fadeUp } from '../../utils/animations'

const features = [
  {
    icon: BarChart3,
    title: 'Driver-Centric Management',
    desc: 'Real-time load lifecycles, appointment tracking, and automated assignments.',
  },
  {
    icon: Wallet,
    title: 'The "Money Brain" Analytics',
    desc: 'Live settlement views, CPM tracking, and advanced profit/loss spread analytics for fleet owners.',
  },
  {
    icon: Route,
    title: 'Intelligent Routing',
    desc: 'Commercial truck routing integrated with live fuel optimizers and IFTA state mile tracking.',
  },
  {
    icon: Shield,
    title: 'Compliance & Fleet Health',
    desc: 'Built-in Tax Hub, automated MACRS depreciation tracking, and predictive maintenance logs.',
  },
]

export function Tech() {
  return (
    <section
      id="tech"
      className="scroll-mt-28 py-24 md:py-32 px-6 bg-[#0a0a0a]"
      aria-labelledby="tech-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2
              id="tech-heading"
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
              variants={fadeUp}
            >
              Vertical Integration Through <span className="bg-gradient-gold bg-clip-text text-transparent">Custom Tech.</span>
            </motion.h2>
            <motion.p
              className="text-[#9ca3af] mb-6 text-lg"
              variants={fadeUp}
            >
              The proprietary Precision Pilot application powers the logistics division with enterprise-grade tools designed for fleet owners and operators.
            </motion.p>
            <PrecisionPilotAudience className="mb-8" />
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-lg bg-[#111111]/50 border border-[#111111]"
                  variants={fadeUp}
                >
                  <feature.icon className="w-6 h-6 text-[#c49a3a] shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <h4 className="font-semibold text-[#f3f4f6] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#9ca3af]">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Galaxy Ultra–style device + rotating app screenshots */}
          <div className="relative flex min-w-0 justify-center md:justify-end">
            <PrecisionPilotDevice />
          </div>
        </div>
      </div>
    </section>
  )
}
