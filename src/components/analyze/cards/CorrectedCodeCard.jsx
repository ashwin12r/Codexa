import { useMemo, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from '../../../context/ThemeContext'
import CardShell from './CardShell'
import { FaCheck, FaCopy, FaDownload } from 'react-icons/fa6'

export default function CorrectedCodeCard({ correctedCode, language = 'javascript' }) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'

  const fileName = useMemo(() => {
    switch (language) {
      case 'python':
        return 'corrected.py'
      case 'java':
        return 'Corrected.java'
      case 'cpp':
        return 'corrected.cpp'
      default:
        return 'corrected.js'
    }
  }, [language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(correctedCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const handleDownload = () => {
    const blob = new Blob([correctedCode], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <CardShell
      title="Corrected Code"
      subtitle="Read-only suggested version"
      badge={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            {copied ? <FaCheck className="h-3.5 w-3.5 text-emerald-500" /> : <FaCopy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <FaDownload className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-white/10">
        <Editor
          height="260px"
          language={language}
          value={correctedCode}
          theme={monacoTheme}
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            fontSize: 14,
            automaticLayout: true,
            padding: { top: 18, bottom: 18 },
          }}
        />
      </div>
    </CardShell>
  )
}