import { FaWandSparkles } from 'react-icons/fa6'
import CardShell from './CardShell'

export default function PersonalizedTipCard({ personalizedTip }) {
  return (
    <CardShell
      title="Personalized Tip"
      subtitle="LSTM-driven pattern insight"
      badge={<span className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-700 dark:text-accent-300">Tailored</span>}
      className="border-accent-400/20 bg-linear-to-br from-accent-500/10 via-white/10 to-primary-500/10 shadow-[0_22px_60px_-36px_rgba(139,92,246,0.45)] dark:border-accent-300/20 dark:from-accent-500/20 dark:via-white/5 dark:to-primary-500/10"
    >
      <div className="flex items-start gap-4 rounded-2xl border border-accent-400/20 bg-white/70 p-4 dark:border-accent-300/20 dark:bg-slate-950/40">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-accent-500 to-primary-600 text-white">
          <FaWandSparkles className="h-4 w-4" />
        </div>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{personalizedTip}</p>
      </div>
    </CardShell>
  )
}