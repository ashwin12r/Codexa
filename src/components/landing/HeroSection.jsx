import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { sectionVariants, itemVariants } from './motion'

export default function HeroSection() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-6 py-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div variants={itemVariants} className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-700 dark:text-primary-300">
            AI Coding Assistant
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 text-balance dark:text-white sm:text-5xl lg:text-6xl">
            AI Coding Assistant for Beginners
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 text-balance dark:text-slate-300 sm:text-lg">
            Understand coding errors faster, get beginner-friendly explanations, and learn how to fix issues with guided AI support.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] hover:from-primary-500 hover:to-accent-500"
            >
              Start Debugging
            </Link>
            <div className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              Learn what went wrong, and how to fix it.
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-8 right-0 h-36 w-36 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-slate-950 p-4 shadow-[0_25px_70px_-35px_rgba(37,99,235,0.65)] dark:border-white/10 sm:p-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium text-slate-400">editor.js</span>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 font-mono text-sm leading-7 text-slate-300">
                <p><span className="text-pink-400">const</span> result = calculateScore(userInput)</p>
                <p><span className="text-pink-400">if</span> (result <span className="text-slate-400">===</span> <span className="text-amber-300">undefined</span>) {'{'}</p>
                <p className="pl-4 text-rose-300">throw new Error('Cannot read score')</p>
                <p>{'}'}</p>
                <p className="mt-4 text-slate-500">// AI explains the bug and suggests a safe fix</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-primary-300">AI Insight</p>
                <p className="mt-3 font-medium text-white">Potential null reference detected.</p>
                <p className="mt-2 leading-6 text-slate-300">
                  Add a guard before accessing the value, then test with an empty input to verify the fix.
                </p>

                <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-200">
                  Suggested fix ready
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}