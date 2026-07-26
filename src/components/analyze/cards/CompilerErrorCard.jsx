import CardShell from './CardShell'

export default function CompilerErrorCard({ compilerError }) {
  return (
    <CardShell title="Compiler / Runtime Error" subtitle="Raw output from the engine">
      <pre className="overflow-x-auto rounded-[18px] border border-white/10 bg-[#050816]/90 p-4 font-mono text-sm leading-6 text-slate-200">
        {compilerError}
      </pre>
    </CardShell>
  )
}