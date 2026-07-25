import CardShell from './CardShell'

function buildHighlightedLine(codeLineText, faultyToken, column) {
  const safeColumn = Math.max(1, column)
  const startIndex = Math.max(0, safeColumn - 1)
  const tokenIndex = codeLineText.indexOf(faultyToken, startIndex)
  const highlightIndex = tokenIndex >= 0 ? tokenIndex : startIndex
  const before = codeLineText.slice(0, highlightIndex)
  const target = codeLineText.slice(highlightIndex, highlightIndex + faultyToken.length)
  const after = codeLineText.slice(highlightIndex + faultyToken.length)

  return { before, target, after, highlightIndex }
}

export default function ErrorPointerCard({ line, column, faulty_token: faultyToken, suggested_token: suggestedToken, code_line_text: codeLineText, onApplyFix }) {
  const { before, target, after, highlightIndex } = buildHighlightedLine(codeLineText, faultyToken, column)
  const pointerLeft = `calc(${highlightIndex}ch + 1rem + ${(faultyToken.length / 2).toFixed(2)}ch)`

  return (
    <CardShell title="Error Pointer" subtitle={`Exact error location at line ${line}, column ${column}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 dark:border-white/10">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            <span>Line {line}</span>
            <span>Column {column}</span>
          </div>

          <div className="relative mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 font-mono text-sm leading-7 text-slate-200">
            <div className="whitespace-pre">
              {before}
              <span className="rounded bg-rose-500/15 px-0.5 text-rose-300 underline decoration-rose-400 decoration-2 underline-offset-4">
                {target || faultyToken}
              </span>
              {after}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[3.55rem]"
              style={{ left: pointerLeft, transform: 'translateX(-50%)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" className="text-rose-400">
                <path d="M9 15V3M4.5 7.5L9 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            The arrow is positioned from the column value using monospace character spacing.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 dark:bg-emerald-500/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Suggested Fix</p>
          <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-white/70 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-950/40 dark:text-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-rose-500/10 px-3 py-1 font-mono text-rose-600 line-through dark:text-rose-300">{faultyToken}</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-emerald-700 dark:text-emerald-300">{suggestedToken}</span>
            </div>

            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Replace the highlighted token so the variable reference matches a declared value.
            </p>

            <button
              type="button"
              onClick={onApplyFix}
              className="mt-5 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-emerald-500 to-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:from-emerald-400 hover:to-primary-500"
            >
              Apply Fix
            </button>
          </div>
        </div>
      </div>
    </CardShell>
  )
}
