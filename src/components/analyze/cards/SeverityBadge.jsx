import CardShell from './CardShell'

const severityStyles = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  High: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
}

export default function SeverityBadge({ severity }) {
  return (
    <CardShell title="Severity" subtitle="How urgent the issue appears to be">
      <div className="flex items-center justify-center py-2">
        <span className={`rounded-full border border-white/10 px-5 py-2 text-sm font-semibold ${severityStyles[severity] ?? severityStyles.Medium}`}>
          {severity}
        </span>
      </div>
    </CardShell>
  )
}