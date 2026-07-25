import { FaWandSparkles } from 'react-icons/fa6'
import CardShell from './CardShell'

export default function PersonalizedTipCard({ personalizedTip }) {
  return (
    <CardShell
      title="Personalized Tip"
      subtitle="LSTM-driven pattern insight"
      badge={<span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">Tailored</span>}
      className="bg-linear-to-br from-violet-500/10 via-white/5 to-primary-500/10 shadow-[0_22px_60px_-36px_rgba(139,92,246,0.35)]"
    >
      <div className="flex items-start gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-linear-to-br from-violet-500 to-primary-500 text-white shadow-[0_14px_40px_-18px_rgba(139,92,246,0.45)]">
          <FaWandSparkles className="h-4 w-4" />
        </div>
        <p className="text-sm leading-7 text-slate-200">{personalizedTip}</p>
      </div>
    </CardShell>
  )
}