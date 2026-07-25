import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'

export default function CardShell({ title, subtitle, badge, defaultOpen = true, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white/70 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-300">{title}</p>
          {subtitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          {badge ? badge : null}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }} className="text-slate-400">
            <FaChevronDown />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200/70 px-5 pb-5 pt-0 dark:border-white/10 sm:px-6 sm:pb-6">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  )
}