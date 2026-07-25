import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnalysisLoader from '../components/analyze/AnalysisLoader'
import ResultsPanel from '../components/analyze/ResultsPanel'
import EditorPanel from '../components/analyze/EditorPanel'
import { analyzeCode, mockAnalysisResult } from '../services/analyzeService'
import { toast } from '../utils/toast'

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

  const characterCount = useMemo(() => code.length, [code])

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
    if (analysisReady && loaderReady && isAnalyzing) {
      setIsAnalyzing(false)
      setShowResults(true)
    }
  }, [analysisReady, isAnalyzing, loaderReady])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <EditorPanel
        code={code}
        language={language}
        isAnalyzing={isAnalyzing}
        characterCount={characterCount}
        onCodeChange={setCode}
        onLanguageChange={handleLanguageChange}
        onClear={handleClear}
        onAnalyze={handleAnalyze}
      />

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
            className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">Results</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Ready when you are</h2>
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
              {analysisError ? analysisError : 'Run analysis to see the error summary, explanation cards, corrected code, diff view, and personalized suggestions.'}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}