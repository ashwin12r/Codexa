import CardShell from './CardShell'

export default function WhyItHappenedCard({ why }) {
  return (
    <CardShell title="Why It Happened" subtitle="Short reasoning behind the issue">
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{why}</p>
    </CardShell>
  )
}