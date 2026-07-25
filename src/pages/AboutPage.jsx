import { motion } from 'framer-motion'
import { FaDatabase, FaRobot, FaShieldHalved, FaCode, FaUserAstronaut, FaUserTie, FaUserGraduate } from 'react-icons/fa6'
import TechBadge from '../components/TechBadge'
import { itemVariants, sectionVariants } from '../components/landing/motion'

const pipelineSteps = [
  { title: 'Static Analysis', description: 'Detect syntax and structural issues quickly.' },
  { title: 'Safe Code Execution', description: 'Validate behavior in a controlled environment.' },
  { title: 'CodeT5', description: 'Explain errors and propose corrected code.' },
  { title: 'LSTM Personalization', description: 'Adapt recommendations to user history.' },
  { title: 'PostgreSQL', description: 'Persist analyses, progress, and learning signals.' },
]

const stackBadges = [
  { label: 'CodeT5', description: 'Code explanation and correction model' },
  { label: 'LSTM', description: 'Personalization from user behavior' },
  { label: 'PostgreSQL', description: 'Progress and analysis storage' },
  { label: 'Static Analysis', description: 'Rule-based issue detection' },
  { label: 'Safe Code Execution', description: 'Controlled validation before suggestions' },
]

const teamMembers = [
  { name: 'Nimisha', role: 'AI Engineer', avatar: 'AC' },
  { name: 'Prathima', role: 'Frontend Engineer', avatar: 'NP' },
  { name: 'Iniya Venkatesan', role: 'Product Designer', avatar: 'MJ' },
  { name: 'Ashwin', role: 'Backend Engineer', avatar: 'LG' },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{description}</p> : null}
    </div>
  )
}

function TeamAvatar({ initials }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-accent-600 text-sm font-semibold text-white shadow-glow">
      {initials}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="space-y-6 py-4">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <SectionHeading
          eyebrow="About"
          title="What Codexa does, and why it exists"
          description="Codexa is an AI Coding Assistant for beginners that explains errors in plain language, suggests safe fixes, and helps users build confidence through guided analysis and personalized learning."
        />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <SectionHeading
          eyebrow="Architecture"
          title="The analysis pipeline"
          description="A simple, transparent pipeline turns raw code into explanations, fixes, and personalized guidance."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-accent-600 text-white shadow-glow">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
              {index < pipelineSteps.length - 1 ? (
                <div className="absolute -right-5 top-1/2 hidden h-0.5 w-5 bg-linear-to-r from-primary-500/40 to-accent-500/40 lg:block" />
              ) : null}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <SectionHeading
          eyebrow="Deep Learning Models"
          title="How the AI makes the experience smarter"
          description="The assistant combines code understanding, explanation generation, and personalization so beginners get help that feels specific to their mistakes."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <motion.article variants={itemVariants} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary-600 to-accent-600 text-white">
                <FaCode className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">CodeT5</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Error explanation and code correction</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              CodeT5 focuses on understanding the code context, explaining why an error happened, and generating a corrected version that preserves the developer’s intent.
            </p>
          </motion.article>

          <motion.article variants={itemVariants} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-accent-600 to-primary-600 text-white">
                <FaRobot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">LSTM</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Personalization based on user history</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              The LSTM model tracks recurring error patterns and recent behavior so the app can recommend topics, tips, and next steps tailored to each learner.
            </p>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <SectionHeading
          eyebrow="Technology Stack"
          title="The tools behind the experience"
          description="The core stack balances fast feedback, safe execution, model-driven explanation, and persistent progress tracking."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stackBadges.map((badge) => (
            <motion.div key={badge.label} variants={itemVariants}>
              <TechBadge label={badge.label} description={badge.description} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <SectionHeading
          eyebrow="Team"
          title="People building Codexa"
          description="A small cross-functional team focused on making debugging easier and more approachable for beginners."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              variants={itemVariants}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center dark:border-white/10 dark:bg-slate-950/40"
            >
              <div className="flex justify-center">
                <TeamAvatar initials={member.avatar} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{member.name}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-primary-600/70 dark:text-primary-300/70">
                Team Member {index + 1}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
