import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaSpinner } from 'react-icons/fa6'

const steps = [
  'Analyzing...',
  'Detecting Errors...',
  'Generating Fix...',
  'Preparing Learning Notes...',
]

const stepDuration = 500

export default function AnalysisLoader({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timers = []

    steps.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setActiveStep(index)

          if (index === steps.length - 1) {
            window.setTimeout(() => {
              onComplete()
            }, stepDuration)
          }
        }, index * stepDuration),
      )
    })

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-surface rounded-[18px] bg-white/6 p-6 transition-all duration-300 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
            Analysis in progress
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Running your code through AI checks</h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
          <FaSpinner className="h-3.5 w-3.5 animate-spin text-primary-500" />
          Multi-step
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {steps.map((step, index) => {
          const isActive = activeStep === index
          const isComplete = activeStep > index

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              className="flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4 transition-colors duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-[#050816]/80 text-slate-300 shadow-[0_14px_40px_-18px_rgba(59,130,246,0.35)]">
                <AnimatePresence mode="wait" initial={false}>
                  {isComplete ? (
                    <motion.span
                      key="complete"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="text-emerald-500"
                    >
                      <FaCheck className="h-4 w-4" />
                    </motion.span>
                  ) : isActive ? (
                    <motion.span
                      key="active"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <FaSpinner className="h-4 w-4 animate-spin text-primary-500" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pending"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="text-slate-400"
                    >
                      {index + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isComplete ? '100%' : isActive ? '72%' : '0%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full rounded-full bg-linear-to-r from-primary-400 to-violet-500"
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}