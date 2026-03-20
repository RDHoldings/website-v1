import { motion } from 'framer-motion'
import { Truck, Megaphone } from 'lucide-react'
import { staggerContainer, scaleIn } from '../../utils/animations'
import logoSunbound from '../../assets/Sunbound Productions Concept Logo Final.png'
import logoPrecisionFreight from '../../assets/Red Domino Precision Freight Lines (no city).png'

const cards = [
  {
    id: 'logistics',
    icon: Truck,
    title: 'Red Domino Logistics',
    copy: 'Overseeing a massive footprint in over-the-road freight, specialized equipment, and dedicated carrier operations.',
    entities: [
      { name: 'Red Domino Precision Freight Lines', logo: logoPrecisionFreight },
      { name: 'Red Domino Equipment' },
      { name: 'Red Domino Expedited' },
    ],
  },
  {
    id: 'media',
    icon: Megaphone,
    title: 'Red Domino Media Group',
    copy: 'A powerhouse digital agency driving brand architecture, full-stack development, and professional-grade audio and video production.',
    entities: [
      { name: 'Sunflower Studios' },
      { name: 'Sunbound Productions', logo: logoSunbound },
      { name: 'Phantom Development' },
      { name: 'HarriHouse Publishing' },
    ],
  },
]

export function Divisions() {
  return (
    <section id="divisions" className="py-24 md:py-32 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{ fontFamily: "'Pirulen', 'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Divisions
        </motion.h2>
        <motion.p
          className="text-[#9ca3af] text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The Core Portfolio
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={scaleIn}
              className="group relative p-8 rounded-lg bg-[#0a0a0a]/80 border border-[#c49a3a]/30"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(196, 154, 58, 0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col h-full">
                <card.icon className="w-10 h-10 text-[#c49a3a] mb-4" />
                <h3
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Felix Titling', 'Playfair Display', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#9ca3af] mb-4 flex-grow">{card.copy}</p>
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-[#c49a3a]/80 mb-2">Active Entities</p>
                  <ul className="space-y-1.5">
                    {card.entities.map((entity) => (
                      <li key={entity.name} className="flex items-center gap-2 text-sm text-[#f3f4f6]">
                        {entity.logo && (
                          <img src={entity.logo} alt="" className="h-4 w-auto shrink-0 opacity-90" />
                        )}
                        <span>{entity.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
