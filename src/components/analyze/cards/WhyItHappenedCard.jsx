import CardShell from './CardShell'

export default function WhyItHappenedCard({ why, title = 'Why It Happened', subtitle = 'Short reasoning behind the issue' }) {
  return (
    <CardShell title={title} subtitle={subtitle}>
      <p className="text-sm leading-7 text-slate-300">{why}</p>
    </CardShell>
  )
}