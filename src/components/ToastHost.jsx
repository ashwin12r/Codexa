import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo } from 'react-icons/fa6'
import { toastEventName } from '../utils/toast'

const iconMap = {
  success: FaCircleCheck,
  error: FaCircleExclamation,
  info: FaCircleInfo,
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleToast = (event) => {
      const nextToast = event.detail
      setToasts((currentToasts) => [...currentToasts, nextToast])

      window.setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== nextToast.id))
      }, 3500)
    }

    window.addEventListener(toastEventName, handleToast)
    return () => window.removeEventListener(toastEventName, handleToast)
  }, [])

  return (
    <div className="fixed right-4 top-4 z-60 flex w-[min(92vw,24rem)] flex-col gap-3 sm:right-6 sm:top-6">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || FaCircleInfo

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${toast.type === 'error' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300' : toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-primary-500/10 text-primary-600 dark:text-primary-300'}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-950 dark:text-white">{toast.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{toast.message}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
