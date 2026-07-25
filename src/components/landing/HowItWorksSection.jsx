import { motion } from 'framer-motion'
import { itemVariants, sectionVariants } from './motion'

const steps = [
  {
    number: '1',
    title: 'Write / Upload Code',
    description: 'Paste code or upload a file to start the review process.',
  },
  {
    number: '2',
    title: 'AI Analyzes',
    description: 'The assistant checks for issues, patterns, and likely causes.',
  },
  {
    number: '3',
    title: 'Get Explanation & Fix',
    description: 'See a clear explanation plus a safe suggested fix.',
  },
  {
    number: '4',
    title: 'Track Progress',
    description: 'Review solved problems and monitor your growth over time.',
  },
]

export default function HowItWorksSection() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Four steps from error to understanding.
        </h2>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-4 lg:gap-0">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={itemVariants}
            className="relative rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 lg:rounded-none lg:border-r-0 lg:first:rounded-l-2xl lg:last:rounded-r-2xl lg:last:border-r lg:after:absolute lg:after:-right-px lg:after:top-1/2 lg:after:hidden lg:after:h-0.5 lg:after:w-8 lg:after:bg-primary-500/30 lg:after:content-['']"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-accent-600 text-sm font-semibold text-white shadow-glow">
                {step.number}
              </div>
              <div className="hidden h-px flex-1 bg-linear-to-r from-primary-500/30 to-accent-500/30 lg:block" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
            {index < steps.length - 1 ? (
              <div className="mt-4 h-px bg-linear-to-r from-primary-500/20 to-accent-500/20 lg:hidden" />
            ) : null}
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}