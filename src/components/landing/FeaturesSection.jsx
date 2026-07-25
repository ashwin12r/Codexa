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
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
          Features
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Built for learning, not just fixing.
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <motion.article
              key={feature.title}
              variants={itemVariants}
              className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 text-primary-700 dark:text-primary-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}