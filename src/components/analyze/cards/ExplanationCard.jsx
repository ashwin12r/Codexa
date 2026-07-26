import CardShell from './CardShell'

export default function ExplanationCard({ explanation, title = 'Explanation', subtitle = 'Beginner-friendly description' }) {
  return (
    <CardShell title={title} subtitle={subtitle} defaultOpen>
      <p className="text-sm leading-7 text-slate-300">{explanation}</p>
    </CardShell>
  )
}