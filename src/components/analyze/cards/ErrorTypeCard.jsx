import CardShell from './CardShell'

export default function ErrorTypeCard({ errorType }) {
  return (
    <CardShell
      title="Error Type"
      subtitle="The primary issue detected in the code"
      badge={<span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">Detected</span>}
    >
      <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
        <p className="text-2xl font-semibold text-white">{errorType}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          This is the category of error the analyzer believes caused the failure.
        </p>
      </div>
    </CardShell>
  )
}