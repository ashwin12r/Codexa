import CardShell from './CardShell'

export default function ErrorTypeCard({ errorType }) {
  return (
    <CardShell
      title="Error Type"
      subtitle="The primary issue detected in the code"
      badge={<span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">Detected</span>}
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/40">
        <p className="text-2xl font-semibold text-slate-950 dark:text-white">{errorType}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          This is the category of error the analyzer believes caused the failure.
        </p>
      </div>
    </CardShell>
  )
}