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
}) {
  const fileInputRef = useRef(null)
  const resizeStateRef = useRef({ isDragging: false, startY: 0, startHeight: editorHeights.initial })
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
      className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 sm:p-8"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
            Code Editor
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Prepare code for analysis</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">
            <FaCode className="h-4 w-4 text-primary-600 dark:text-primary-300" />
            <span>Language</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className="bg-transparent text-sm outline-none"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-slate-900">
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
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <FaFileArrowUp className="h-4 w-4" />
            Upload Code File
          </button>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <FaRotateLeft className="h-4 w-4" />
            Clear
          </button>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary-600 to-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:from-primary-500 hover:to-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaArrowUpRightFromSquare className="h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-35px_rgba(37,99,235,0.6)] dark:border-white/10">
        <Editor
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

      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{characterCount} characters</p>
        <p>Shortcut: Ctrl+Enter on Windows, Cmd+Enter on Mac</p>
      </div>
    </motion.section>
  )
}