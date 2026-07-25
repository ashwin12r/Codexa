import CardShell from './CardShell'

function splitLines(value = '') {
  return value.replace(/\n$/, '').split('\n')
}

function getLineClass(isDifferent) {
  return isDifferent ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300' : 'text-slate-600 dark:text-slate-300'
}

export default function DiffViewerCard({ originalCode, correctedCode }) {
  const originalLines = splitLines(originalCode)
  const correctedLines = splitLines(correctedCode)
  const maxLines = Math.max(originalLines.length, correctedLines.length)

  return (
    <CardShell title="Diff Viewer" subtitle="Original vs corrected code">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Original</p>
          <div className="space-y-1 font-mono text-sm leading-6">
            {Array.from({ length: maxLines }).map((_, index) => {
              const leftLine = originalLines[index] ?? ''
              const rightLine = correctedLines[index] ?? ''
              const isDifferent = leftLine !== rightLine

              return (
                <div key={`original-${index}`} className={`flex gap-3 rounded-xl px-3 py-1.5 ${getLineClass(isDifferent)}`}>
                  <span className="w-8 shrink-0 text-right text-xs text-slate-400">{index + 1}</span>
                  <span className="min-w-0 whitespace-pre-wrap break-words">{leftLine || ' '}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Corrected</p>
          <div className="space-y-1 font-mono text-sm leading-6">
            {Array.from({ length: maxLines }).map((_, index) => {
              const leftLine = originalLines[index] ?? ''
              const rightLine = correctedLines[index] ?? ''
              const isDifferent = leftLine !== rightLine

              return (
                <div key={`corrected-${index}`} className={`flex gap-3 rounded-xl px-3 py-1.5 ${isDifferent ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>
                  <span className="w-8 shrink-0 text-right text-xs text-slate-400">{index + 1}</span>
                  <span className="min-w-0 whitespace-pre-wrap break-words">{rightLine || ' '}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </CardShell>
  )
}