import CardShell from './CardShell'

export default function SuggestionsCard({ suggestions = [] }) {
  return (
    <CardShell title="Suggestions" subtitle="Best-practice guidance">
      <ul className="space-y-3">
        {suggestions.map((suggestion) => (
          <li key={suggestion} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  )
}