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
      className="relative space-y-8"
    >
      <div className="pointer-events-none absolute left-8 top-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <motion.div variants={itemVariants} className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Four steps from error to understanding.
        </h2>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-4 lg:gap-0">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={itemVariants}
            className="relative flex h-full min-h-[220px] flex-col rounded-[18px] border border-white/10 bg-white/6 p-5 shadow-[0_24px_70px_-34px_rgba(2,6,23,0.8)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(139,92,246,0.25)] lg:rounded-none lg:border-r-0 lg:first:rounded-l-[18px] lg:last:rounded-r-[18px] lg:last:border-r lg:after:absolute lg:after:-right-px lg:after:top-1/2 lg:after:hidden lg:after:h-0.5 lg:after:w-8 lg:after:bg-cyan-400/30 lg:after:content-['']"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-linear-to-br from-primary-500 to-violet-500 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(59,130,246,0.5)]">
                {step.number}
              </div>
              <div className="hidden h-px flex-1 bg-linear-to-r from-cyan-400/30 to-violet-400/30 lg:block" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
            {index < steps.length - 1 ? (
              <div className="mt-4 h-px bg-linear-to-r from-cyan-400/20 to-violet-400/20 lg:hidden" />
            ) : null}
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}