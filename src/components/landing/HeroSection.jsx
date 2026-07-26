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
      className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/5 px-6 py-10 shadow-[0_24px_80px_-40px_rgba(2,6,23,0.8)] backdrop-blur-2xl transition-all duration-300 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -left-10 top-8 h-44 w-44 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 right-0 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div variants={itemVariants} className="max-w-2xl">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            AI Coding Assistant
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            AI Coding Assistant for Beginners
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 text-balance sm:text-lg">
            Understand coding errors faster, get beginner-friendly explanations, and learn how to fix issues with guided AI support.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center rounded-[18px] bg-linear-to-r from-primary-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(59,130,246,0.55)] transition hover:-translate-y-0.5 hover:from-primary-400 hover:to-violet-400"
            >
              Start Debugging
            </Link>
            <div className="inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-slate-300">
              Learn what went wrong, and how to fix it.
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-8 right-0 h-36 w-36 rounded-full bg-accent-500/20 blur-3xl" />

          <div className="relative rounded-[18px] border border-white/10 bg-[#050816]/95 p-4 shadow-[0_25px_70px_-35px_rgba(59,130,246,0.55)] sm:p-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium text-slate-400">editor.js</span>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 font-mono text-sm leading-7 text-slate-300">
                <p><span className="text-pink-400">const</span> result = calculateScore(userInput)</p>
                <p><span className="text-pink-400">if</span> (result <span className="text-slate-400">===</span> <span className="text-amber-300">undefined</span>) {'{'}</p>
                <p className="pl-4 text-rose-300">throw new Error('Cannot read score')</p>
                <p>{'}'}</p>
                <p className="mt-4 text-slate-500">// AI explains the bug and suggests a safe fix</p>
              </div>

              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">AI Insight</p>
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