import { motion } from 'framer-motion'
import CompilerErrorCard from './cards/CompilerErrorCard'
import CorrectedCodeCard from './cards/CorrectedCodeCard'
import ErrorPointerCard from './cards/ErrorPointerCard'
import DiffViewerCard from './cards/DiffViewerCard'
import ErrorTypeCard from './cards/ErrorTypeCard'
import ExplanationCard from './cards/ExplanationCard'
import PersonalizedTipCard from './cards/PersonalizedTipCard'
import ResourcesCard from './cards/ResourcesCard'
import SeverityBadge from './cards/SeverityBadge'
import SuggestedFixCard from './cards/SuggestedFixCard'
import SuggestionsCard from './cards/SuggestionsCard'
import WhyItHappenedCard from './cards/WhyItHappenedCard'

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
      className="space-y-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 sm:p-8"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">Results</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Analysis output</h2>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Mock data
        </span>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ErrorTypeCard errorType={data.error_type} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <SeverityBadge severity={data.severity} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <CompilerErrorCard compilerError={data.compiler_error} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ErrorPointerCard
            line={data.line}
            column={data.column}
            faulty_token={data.faulty_token}
            suggested_token={data.suggested_token}
            code_line_text={data.code_line_text}
            onApplyFix={onApplyFix}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ExplanationCard explanation={data.explanation} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <WhyItHappenedCard why={data.why} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SuggestedFixCard suggestedFix={data.suggested_fix} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <CorrectedCodeCard correctedCode={data.corrected_code} language={language} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DiffViewerCard originalCode={originalCode} correctedCode={data.corrected_code} />
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