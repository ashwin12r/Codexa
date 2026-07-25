import CardShell from './CardShell'

export default function SuggestionsCard({ suggestions = [] }) {
  return (
    <CardShell title="Suggestions" subtitle="Best-practice guidance">
      <ul className="space-y-3">
        {suggestions.map((suggestion) => (
          <li key={suggestion} className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  )
}