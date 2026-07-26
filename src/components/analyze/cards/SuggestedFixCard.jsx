import CardShell from './CardShell'

export default function SuggestedFixCard({ suggestedFix }) {
  return (
    <CardShell title="Suggested Fix" subtitle="Short actionable recommendation">
      <div className="rounded-[18px] border border-cyan-400/15 bg-cyan-400/10 p-4 text-sm leading-7 text-slate-200">
        {suggestedFix}
      </div>
    </CardShell>
  )
}