import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'

export default function CardShell({ title, subtitle, badge, defaultOpen = true, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <motion.article
      layout
      className={`glass-surface rounded-[18px] bg-white/6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(59,130,246,0.3)] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-white/[0.03] sm:p-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{title}</p>
          {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          {badge ? badge : null}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }} className="text-slate-400">
            <FaChevronDown />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            id={contentId}
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}