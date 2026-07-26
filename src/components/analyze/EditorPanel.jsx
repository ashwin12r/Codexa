import { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { FaArrowUpRightFromSquare, FaCode, FaCircleCheck, FaFileArrowUp, FaRotateLeft } from 'react-icons/fa6'

const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'javascript', label: 'JavaScript' },
]

const editorHeights = {
  initial: 420,
  min: 280,
  max: 760,
}

function getFileLanguage(fileName = '') {
  const extension = fileName.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'py':
      return 'python'
    case 'java':
      return 'java'
    case 'cpp':
      return 'cpp'
    case 'js':
      return 'javascript'
    default:
      return 'javascript'
  }
}

export default function EditorPanel({
  code,
  language,
  isAnalyzing,
  characterCount,
  onCodeChange,
  onLanguageChange,
  onClear,
  onAnalyze,
  panelWidth,
  errorInsight,
}) {
  const fileInputRef = useRef(null)
  const resizeStateRef = useRef({ isDragging: false, startY: 0, startHeight: editorHeights.initial })
  const editorRef = useRef(null)
  const monacoRef = useRef(null)
  const decorationsRef = useRef([])
  const [editorHeight, setEditorHeight] = useState(editorHeights.initial)

  const monacoLanguage = useMemo(() => {
    switch (language) {
      case 'python':
        return 'python'
      case 'java':
        return 'java'
      case 'cpp':
        return 'cpp'
      default:
        return 'javascript'
    }
  }, [language])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!resizeStateRef.current.isDragging) {
        return
      }

      const nextHeight = resizeStateRef.current.startHeight + (event.clientY - resizeStateRef.current.startY)
      setEditorHeight(Math.min(editorHeights.max, Math.max(editorHeights.min, nextHeight)))
    }

    const handleMouseUp = () => {
      resizeStateRef.current.isDragging = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    const handleShortcut = (event) => {
      const isMac = navigator.platform.toLowerCase().includes('mac')
      const shortcutPressed = isMac ? event.metaKey && event.key === 'Enter' : event.ctrlKey && event.key === 'Enter'

      if (shortcutPressed) {
        event.preventDefault()
        if (!isAnalyzing) {
          onAnalyze()
        }
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [isAnalyzing, onAnalyze])

  useEffect(() => {
    const editor = editorRef.current
    const monaco = monacoRef.current

    if (!editor || !monaco) {
      return
    }

    if (!errorInsight) {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
      return
    }

    const lineNumber = Math.max(1, errorInsight.line ?? 1)
    const token = errorInsight.faulty_token || ''
    const lines = code.replace(/\n$/, '').split('\n')
    const lineText = lines[lineNumber - 1] ?? errorInsight.code_line_text ?? ''
    const safeColumn = Math.max(1, errorInsight.column ?? 1)
    const startIndex = Math.max(0, safeColumn - 1)
    const tokenIndex = token ? lineText.indexOf(token, startIndex) : -1
    const startColumn = tokenIndex >= 0 ? tokenIndex + 1 : safeColumn
    const endColumn = startColumn + Math.max(token.length, 1)

    const newDecorations = [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'codexa-error-line',
          linesDecorationsClassName: 'codexa-error-line',
          glyphMarginClassName: 'codexa-error-glyph',
        },
      },
      {
        range: new monaco.Range(lineNumber, startColumn, lineNumber, endColumn),
        options: {
          inlineClassName: 'codexa-error-token',
        },
      },
    ]

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations)

    return () => {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
    }
  }, [code, errorInsight])

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const fileText = await file.text()
    const nextLanguage = getFileLanguage(file.name)

    onLanguageChange(nextLanguage)
    onCodeChange(fileText)
    event.target.value = ''
  }

  const startResize = (event) => {
    resizeStateRef.current = {
      isDragging: true,
      startY: event.clientY,
      startHeight: editorHeight,
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ '--editor-width': `${panelWidth}px` }}
      className="glass-surface w-full rounded-[18px] bg-white/6 p-6 transition-all duration-300 sm:p-8 lg:flex-none lg:[width:var(--editor-width)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
            Code Editor
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Prepare code for analysis</h2>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]">
              <FaCode className="h-4 w-4 text-cyan-200" />
              <span>Language</span>
              <select
                value={language}
                onChange={(event) => onLanguageChange(event.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-slate-950">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".py,.java,.cpp,.js"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={handleFileButtonClick}
              className="inline-flex items-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <FaFileArrowUp className="h-4 w-4" />
              Upload Code File
            </button>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <FaRotateLeft className="h-4 w-4" />
              Clear
            </button>
          </div>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-linear-to-r from-primary-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(59,130,246,0.55)] transition hover:-translate-y-0.5 hover:from-primary-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60 lg:min-w-[220px]"
          >
            <FaArrowUpRightFromSquare className="h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-white/10 bg-[#050816]/90 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.45)]">
        <Editor
          onMount={handleEditorMount}
          height={`${editorHeight}px`}
          language={monacoLanguage}
          value={code}
          onChange={(nextValue) => onCodeChange(nextValue ?? '')}
          theme="vs-dark"
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            smoothScrolling: true,
            padding: { top: 20, bottom: 20 },
            renderLineHighlight: 'all',
            glyphMargin: true,
            lineDecorationsWidth: 18,
          }}
        />

        <button
          type="button"
          onMouseDown={startResize}
          className="flex w-full cursor-row-resize items-center justify-center gap-2 border-t border-white/10 bg-white/5 py-2 text-xs uppercase tracking-[0.24em] text-slate-400"
          aria-label="Resize editor height"
        >
          <FaCircleCheck className="h-3.5 w-3.5" />
          Drag to resize
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{characterCount} characters</p>
        <p>Shortcut: Ctrl+Enter on Windows, Cmd+Enter on Mac</p>
      </div>
    </motion.section>
  )
}