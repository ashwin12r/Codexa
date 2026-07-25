import CardShell from './CardShell'

export default function CompilerErrorCard({ compilerError }) {
  return (
    <CardShell title="Compiler / Runtime Error" subtitle="Raw output from the engine">
      <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-200 dark:border-white/10">
        {compilerError}
      </pre>
    </CardShell>
  )
}