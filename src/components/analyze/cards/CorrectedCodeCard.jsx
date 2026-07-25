import { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from '../../../context/ThemeContext'
import CardShell from './CardShell'
import { FaCheck, FaCopy, FaDownload } from 'react-icons/fa6'
import { toast } from '../../../utils/toast'

const languageExtensions = {
  python: '.py',
  java: '.java',
  cpp: '.cpp',
  javascript: '.js',
}

function resolveDownloadFileName({ language, fileName }) {
  const baseName = fileName ? fileName.replace(/\.[^.]+$/, '') : 'corrected-code'
  const extensionFromFileName = fileName?.match(/\.[^.]+$/)?.[0]
  const extension = extensionFromFileName || languageExtensions[language] || '.txt'

  return `${baseName}${extension}`
}

export default function CorrectedCodeCard({ correctedCode, language = 'javascript', fileName: originalFileName }) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const copyResetTimerRef = useRef(null)

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'

  const downloadFileName = useMemo(() => {
    return resolveDownloadFileName({ language, fileName: originalFileName })
  }, [language, originalFileName])

  useEffect(() => {
    return () => {
      window.clearTimeout(copyResetTimerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      if (!correctedCode?.trim()) {
        throw new Error('No corrected code is available to copy.')
      }

      await navigator.clipboard.writeText(correctedCode)
      setCopied(true)
      window.clearTimeout(copyResetTimerRef.current)
      copyResetTimerRef.current = window.setTimeout(() => setCopied(false), 1400)

      toast({
        type: 'success',
        title: 'Code copied',
        message: 'Corrected code was copied to your clipboard.',
      })
    } catch (error) {
      toast({
        type: 'error',
        title: 'Copy failed',
        message: error?.message || 'Unable to copy corrected code right now.',
      })
    }
  }

  const handleDownload = () => {
    try {
      if (!correctedCode?.trim()) {
        throw new Error('No corrected code is available to download.')
      }

      const blob = new Blob([correctedCode], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = downloadFileName
      link.rel = 'noreferrer'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      toast({
        type: 'success',
        title: 'Download started',
        message: `Corrected code was saved as ${downloadFileName}.`,
      })
    } catch (error) {
      toast({
        type: 'error',
        title: 'Download failed',
        message: error?.message || 'Unable to download corrected code right now.',
      })
    }
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
            aria-label="Copy corrected code"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            {copied ? <FaCheck className="h-3.5 w-3.5 text-emerald-300" /> : <FaCopy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download corrected code"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <FaDownload className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#050816]/90">
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