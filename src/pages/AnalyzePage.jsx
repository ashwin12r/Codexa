import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnalysisLoader from '../components/analyze/AnalysisLoader'
import ResultsPanel from '../components/analyze/ResultsPanel'
import EditorPanel from '../components/analyze/EditorPanel'
import { analyzeCode, mockAnalysisResult } from '../services/analyzeService'
import { toast } from '../utils/toast'

const editorPanelLimits = {
  initial: 640,
  min: 480,
  max: 860,
  step: 24,
  minResultsWidth: 360,
}

const initialCodeByLanguage = {
  javascript: "function greet(name) {\n  if (!name) {\n    throw new Error('Name is required')\n  }\n\n  return `Hello, ${name}!`\n}\n",
  python: `def greet(name):
    if not name:
        raise ValueError('Name is required')

    return f'Hello, {name}!'
`,
  java: `public class Main {
    public static void main(String[] args) {
        String name = "World";
        System.out.println("Hello, " + name + "!");
    }
}
`,
  cpp: `#include <iostream>
#include <string>

int main() {
    std::string name = "World";
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}
`,
}

const defaultLanguage = 'javascript'

export default function AnalyzePage() {
  const [language, setLanguage] = useState(defaultLanguage)
  const [code, setCode] = useState(initialCodeByLanguage[defaultLanguage])
  const [submittedCode, setSubmittedCode] = useState(initialCodeByLanguage[defaultLanguage])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisReady, setAnalysisReady] = useState(false)
  const [loaderReady, setLoaderReady] = useState(false)
  const [analysisError, setAnalysisError] = useState('')
  const [editorWidth, setEditorWidth] = useState(editorPanelLimits.initial)
  const panelLayoutRef = useRef(null)
  const resizeStateRef = useRef({ isDragging: false, startX: 0, startWidth: editorPanelLimits.initial })

  const characterCount = useMemo(() => code.length, [code])

  const clampEditorWidth = (nextWidth, layoutWidth = panelLayoutRef.current?.getBoundingClientRect().width ?? window.innerWidth) => {
    const availableMaxWidth = Math.max(editorPanelLimits.min, layoutWidth - editorPanelLimits.minResultsWidth)
    const maxWidth = Math.min(editorPanelLimits.max, availableMaxWidth)

    return Math.min(maxWidth, Math.max(editorPanelLimits.min, nextWidth))
  }

  const updateEditorWidth = (nextWidth) => {
    setEditorWidth(clampEditorWidth(nextWidth))
  }

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    setCode(initialCodeByLanguage[nextLanguage])
  }

  const handleClear = () => {
    setCode('')
  }

  const handleAnalyze = async () => {
    setSubmittedCode(code)
    setShowResults(false)
    setIsAnalyzing(true)
    setAnalysisReady(false)
    setLoaderReady(false)
    setAnalysisError('')
    setAnalysisResult(null)

    analyzeCode({ language, code })
      .then((response) => {
        setAnalysisResult(response)
        setAnalysisReady(true)
      })
      .catch((error) => {
        const message = error?.message || 'Failed to analyze code.'
        setAnalysisError(message)
        toast({
          type: 'error',
          title: 'Analysis failed',
          message,
        })
        setIsAnalyzing(false)
      })
  }

  const handleAnalysisComplete = () => {
    setLoaderReady(true)
  }

  const handleApplyFix = () => {
    if (!analysisResult?.corrected_code) {
      return
    }

    setCode(analysisResult.corrected_code)
    setShowResults(false)
    toast({
      type: 'success',
      title: 'Fix applied',
      message: 'The corrected code has been copied into the editor.',
    })
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setEditorWidth((currentWidth) => clampEditorWidth(currentWidth))
    }

    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const startEditorResize = (event) => {
    if (event.button !== 0) {
      return
    }

    resizeStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startWidth: editorWidth,
    }

    const handlePointerMove = (moveEvent) => {
      if (!resizeStateRef.current.isDragging) {
        return
      }

      const nextWidth = resizeStateRef.current.startWidth + (moveEvent.clientX - resizeStateRef.current.startX)
      updateEditorWidth(nextWidth)
    }

    const handlePointerUp = () => {
      resizeStateRef.current.isDragging = false
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handleEditorResizeKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      updateEditorWidth(editorWidth - editorPanelLimits.step)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      updateEditorWidth(editorWidth + editorPanelLimits.step)
    }

    if (event.key === 'Home') {
      event.preventDefault()
      updateEditorWidth(editorPanelLimits.min)
    }

    if (event.key === 'End') {
      event.preventDefault()
      updateEditorWidth(editorPanelLimits.max)
    }
  }

  useEffect(() => {
    if (analysisReady && loaderReady && isAnalyzing) {
      setIsAnalyzing(false)
      setShowResults(true)
    }
  }, [analysisReady, isAnalyzing, loaderReady])

  return (
    <div ref={panelLayoutRef} className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="pointer-events-none absolute -left-10 top-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <EditorPanel
        code={code}
        language={language}
        isAnalyzing={isAnalyzing}
        characterCount={characterCount}
        onCodeChange={setCode}
        onLanguageChange={handleLanguageChange}
        onClear={handleClear}
        onAnalyze={handleAnalyze}
        panelWidth={editorWidth}
        errorInsight={showResults ? analysisResult || mockAnalysisResult : null}
      />

      <button
        type="button"
        aria-label="Resize editor panel"
        aria-orientation="vertical"
        onPointerDown={startEditorResize}
        onKeyDown={handleEditorResizeKeyDown}
        title="Resize editor panel"
        className="hidden self-stretch lg:flex lg:w-4 lg:cursor-col-resize lg:items-center lg:justify-center"
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-slate-200/80 transition-colors duration-200 hover:bg-primary-500/20 dark:bg-white/10 dark:hover:bg-primary-500/25">
          <span className="h-12 w-1 rounded-full bg-slate-400/70 dark:bg-slate-500/80" />
        </span>
      </button>

      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <AnalysisLoader onComplete={handleAnalysisComplete} />
            </motion.div>
          ) : showResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <ResultsPanel data={analysisResult || mockAnalysisResult} originalCode={submittedCode} onApplyFix={handleApplyFix} />
            </motion.div>
          ) : (
            <motion.section
              key="idle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="glass-surface rounded-[18px] bg-white/6 p-6 transition-all duration-300 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Results</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Ready when you are</h2>
              <div className="mt-6 rounded-[18px] border border-dashed border-white/10 bg-white/5 p-6 text-sm leading-6 text-slate-300">
                {analysisError ? analysisError : 'Run analysis to see the error summary, explanation cards, corrected code, diff view, and personalized suggestions.'}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}