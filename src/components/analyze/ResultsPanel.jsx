import { motion } from 'framer-motion'
import CompilerErrorCard from './cards/CompilerErrorCard'
import CorrectedCodeCard from './cards/CorrectedCodeCard'
import DiffViewerCard from './cards/DiffViewerCard'
import ErrorTypeCard from './cards/ErrorTypeCard'
import ExplanationCard from './cards/ExplanationCard'
import PersonalizedTipCard from './cards/PersonalizedTipCard'
import ResourcesCard from './cards/ResourcesCard'
import SeverityBadge from './cards/SeverityBadge'
import SuggestedFixCard from './cards/SuggestedFixCard'
import SuggestionsCard from './cards/SuggestionsCard'
import WhyItHappenedCard from './cards/WhyItHappenedCard'
import VisualErrorPanel from './VisualErrorPanel'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function ResultsPanel({ data, originalCode, language = 'javascript', onApplyFix }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-surface space-y-4 rounded-[18px] bg-white/6 p-6 transition-all duration-300 sm:p-8"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">Results</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Analysis output</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
          Mock data
        </span>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <VisualErrorPanel errorData={data} code={originalCode} onApplyFix={onApplyFix} />
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          <ErrorTypeCard errorType={data.error_type} />
          <WhyItHappenedCard why={data.why} title="Cause" subtitle="Why the analyzer thinks this happened" />
          <SuggestedFixCard suggestedFix={data.suggested_fix} />
          <ExplanationCard explanation={data.explanation} title="Learn Why" subtitle="Educational explanation" />
          <div className="sm:col-span-2 lg:col-span-1">
            <CorrectedCodeCard correctedCode={data.corrected_code} language={language} />
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <CompilerErrorCard compilerError={data.compiler_error} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DiffViewerCard originalCode={originalCode} correctedCode={data.corrected_code} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SeverityBadge severity={data.severity} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <PersonalizedTipCard personalizedTip={data.personalized_tip} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ResourcesCard resources={data.resources} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SuggestionsCard suggestions={data.suggestions} />
        </motion.div>
      </div>
    </motion.section>
  )
}