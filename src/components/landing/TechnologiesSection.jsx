import { motion } from 'framer-motion'
import { FaDatabase, FaRobot, FaShieldHalved, FaTriangleExclamation } from 'react-icons/fa6'
import TechBadge from '../TechBadge'
import { itemVariants, sectionVariants } from './motion'

const technologies = [
  {
    icon: FaRobot,
    label: 'CodeT5',
    description: 'Code understanding and fix generation',
  },
  {
    icon: FaRobot,
    label: 'LSTM',
    description: 'Sequence-aware pattern analysis',
  },
  {
    icon: FaDatabase,
    label: 'PostgreSQL',
    description: 'Progress and history storage',
  },
  {
    icon: FaTriangleExclamation,
    label: 'Static Analysis',
    description: 'Rule-based issue detection',
  },
  {
    icon: FaShieldHalved,
    label: 'Safe Code Execution',
    description: 'Controlled validation of fixes',
  },
]

export default function TechnologiesSection() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative space-y-8"
    >
      <div className="pointer-events-none absolute -right-8 top-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-12 bottom-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <motion.div variants={itemVariants} className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">
          Technologies Used
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A simple stack, tuned for reliable guidance.
        </h2>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {technologies.map((technology) => {
          return (
            <motion.div
              key={technology.label}
              variants={itemVariants}
              className="h-full"
            >
              <TechBadge label={technology.label} description={technology.description} />
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}