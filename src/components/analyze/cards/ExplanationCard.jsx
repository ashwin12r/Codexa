import CardShell from './CardShell'

export default function ExplanationCard({ explanation }) {
  return (
    <CardShell title="Explanation" subtitle="Beginner-friendly description" defaultOpen>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{explanation}</p>
    </CardShell>
  )
}