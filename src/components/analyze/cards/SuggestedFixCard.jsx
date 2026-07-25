import CardShell from './CardShell'

export default function SuggestedFixCard({ suggestedFix }) {
  return (
    <CardShell title="Suggested Fix" subtitle="Short actionable recommendation">
      <div className="rounded-2xl border border-primary-500/15 bg-primary-500/10 p-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
        {suggestedFix}
      </div>
    </CardShell>
  )
}