import { motion } from 'framer-motion'
import { FaChartLine, FaCircleInfo, FaCode, FaLightbulb, FaShieldHalved } from 'react-icons/fa6'
import { itemVariants, sectionVariants } from './motion'

const features = [
  {
    icon: FaCode,
    title: 'Error Detection',
    description: 'Identify syntax issues, logic mistakes, and common coding pitfalls quickly.',
  },
  {
    icon: FaCircleInfo,
    title: 'Beginner-Friendly Explanations',
    description: 'Get plain-language explanations that help beginners understand what broke.',
  },
  {
    icon: FaLightbulb,
    title: 'AI-Generated Fixes',
    description: 'Receive clean fix suggestions that point you toward the safest next step.',
  },
  {
    icon: FaChartLine,
    title: 'Personalized Learning',
    description: 'Adapt guidance based on your pace, skill level, and the kinds of errors you make.',
  },
  {
    icon: FaShieldHalved,
    title: 'Progress Tracking',
    description: 'Track improvement over time and revisit solved problems when you need a refresher.',
  },
]

export default function FeaturesSection() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative space-y-8"
    >
      <div className="pointer-events-none absolute -left-12 top-8 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />
      <motion.div variants={itemVariants} className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">
          Features
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Built for learning, not just fixing.
        </h2>
      </motion.div>

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <motion.article
              key={feature.title}
              variants={itemVariants}
              className="glass-surface flex h-full min-h-[250px] flex-col rounded-[18px] bg-white/6 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(59,130,246,0.28)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-linear-to-br from-primary-500/15 to-violet-500/15 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}