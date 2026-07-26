function splitCodeLines(code = '') {
  return code.replace(/\n$/, '').split('\n')
}

function buildSnippet(lines, lineNumber, radius = 2) {
  const startLine = Math.max(1, lineNumber - radius)
  const endLine = Math.min(lines.length, lineNumber + radius)

  return lines.slice(startLine - 1, endLine).map((text, index) => ({
    lineNumber: startLine + index,
    text,
  }))
}

function locateToken(lineText = '', token = '', column = 1) {
  const safeColumn = Math.max(1, column)
  const startIndex = Math.max(0, safeColumn - 1)
  const tokenIndex = token ? lineText.indexOf(token, startIndex) : -1

  return tokenIndex >= 0 ? tokenIndex : startIndex
}

export default function VisualErrorPanel({ errorData, code, onApplyFix }) {
  const lines = splitCodeLines(code)
  const lineNumber = Math.max(1, errorData?.line ?? 1)
  const token = errorData?.faulty_token || ''
  const lineText = lines[lineNumber - 1] ?? errorData?.code_line_text ?? ''
  const highlightIndex = locateToken(lineText, token, errorData?.column)
  const snippet = buildSnippet(lines, lineNumber, 2)

  return (
    <section className="glass-surface rounded-[18px] bg-white/6 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Visual Error</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{errorData?.error_type || 'Detected Error'}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A focused snapshot of the failing code with the exact token highlighted.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Line {lineNumber}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{errorData?.error_type || 'Error'}</span>
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/10 bg-[#050816]/90 p-4 font-mono text-sm leading-7 text-slate-200 shadow-[0_18px_50px_-30px_rgba(59,130,246,0.35)]">
        <div className="space-y-1 overflow-x-auto">
          {snippet.map((snippetLine) => {
            const isErrorLine = snippetLine.lineNumber === lineNumber
            const rowLineText = isErrorLine ? lineText : snippetLine.text
            const tokenIndex = isErrorLine ? highlightIndex : -1
            const before = isErrorLine && token ? rowLineText.slice(0, tokenIndex) : rowLineText
            const target = isErrorLine && token ? rowLineText.slice(tokenIndex, tokenIndex + token.length) : ''
            const after = isErrorLine && token ? rowLineText.slice(tokenIndex + token.length) : ''

            return (
              <div key={snippetLine.lineNumber} className={`flex gap-3 rounded-[14px] px-3 py-1.5 ${isErrorLine ? 'codexa-error-line' : ''}`}>
                <span className="w-10 shrink-0 text-right text-xs text-slate-500">{snippetLine.lineNumber}</span>
                <div className="relative min-w-0 flex-1">
                  {isErrorLine ? (
                    <>
                      <div className="whitespace-pre-wrap break-words">
                        {before}
                        <span className="codexa-error-token rounded px-0.5 text-rose-100">
                          {target || token || rowLineText}
                        </span>
                        {after}
                      </div>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-4 text-[0.8rem] text-cyan-200"
                        style={{ left: `calc(${Math.max(0, highlightIndex)}ch + 0.25rem)` }}
                      >
                        ↳
                      </span>
                    </>
                  ) : (
                    <div className="whitespace-pre-wrap break-words text-slate-300">{rowLineText || ' '}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          Error line <span className="font-semibold text-white">{lineNumber}</span> uses token{' '}
          <span className="font-semibold text-rose-200">{token || 'unknown'}</span>.
        </p>

        <button
          type="button"
          onClick={onApplyFix}
          className="inline-flex items-center justify-center rounded-[18px] bg-linear-to-r from-emerald-400 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(16,185,129,0.45)] transition hover:-translate-y-0.5 hover:from-emerald-300 hover:to-violet-400"
        >
          Apply Fix
        </button>
      </div>
    </section>
  )
}