import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FaArrowTrendUp, FaClock, FaCode, FaFire, FaTriangleExclamation } from 'react-icons/fa6'
import { getDashboardData } from '../services/dashboardService'

const severityStyles = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  High: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
}

const pieColors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#14b8a6']

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

function DashboardStatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-300">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary-500/15 to-accent-500/15 text-primary-700 dark:text-primary-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}

function DashboardPanel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 sm:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">{title}</p>
          {subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getDashboardData()
      .then((data) => {
        if (isMounted) {
          setDashboardData(data)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const topErrorColors = useMemo(() => ['#3b82f6', '#8b5cf6', '#f59e0b', '#14b8a6'], [])

  if (isLoading || !dashboardData) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-40 animate-pulse rounded-3xl bg-white/60 dark:bg-white/5" />
        <div className="h-40 animate-pulse rounded-3xl bg-white/60 dark:bg-white/5" />
        <div className="h-40 animate-pulse rounded-3xl bg-white/60 dark:bg-white/5" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">Your coding progress at a glance</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Track recent analyses, explore trends, and follow personalized learning recommendations built from your coding history.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
            {dashboardData.learning.improvementStreak} day improvement streak
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.25 }}>
          <DashboardStatCard icon={FaTriangleExclamation} title="Most Frequent Error" value={dashboardData.stats.mostFrequentError} description="The error type that appears most often in your recent runs." />
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.25, delay: 0.05 }}>
          <DashboardStatCard icon={FaCode} title="Favorite Language" value={dashboardData.stats.favoriteLanguage} description="The language you analyze most often in the editor." />
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.25, delay: 0.1 }}>
          <DashboardStatCard icon={FaFire} title="Current Streak" value={`${dashboardData.stats.currentStreak} days`} description="How many days in a row you have stayed active." />
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.25, delay: 0.15 }}>
          <DashboardStatCard icon={FaArrowTrendUp} title="Weekly Progress" value={`${dashboardData.stats.weeklyProgress}%`} description="How much of this week’s target you have completed." />
        </motion.div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="xl:col-span-1"
        >
          <DashboardPanel title="Recent Analyses" subtitle="Latest issues and their severity">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Language</th>
                    <th className="pb-3 pr-4 font-medium">Error</th>
                    <th className="pb-3 pr-4 font-medium">Severity</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentAnalyses.map((analysis) => (
                    <tr key={`${analysis.date}-${analysis.language}`} className="border-t border-slate-200/70 dark:border-white/10">
                      <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{analysis.date}</td>
                      <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{analysis.language}</td>
                      <td className="py-3 pr-4 font-medium text-slate-950 dark:text-white">{analysis.errorType}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyles[analysis.severity]}`}>{analysis.severity}</span>
                      </td>
                      <td className="py-3">
                        <a href="/analyze" className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-300">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardPanel>
        </motion.div>

        <div className="grid gap-4 xl:col-span-2 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <DashboardPanel title="Error Distribution" subtitle="How your errors are spread across types">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dashboardData.errorDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                      {dashboardData.errorDistribution.map((entry, index) => (
                        <Cell key={entry.name} fill={topErrorColors[index % topErrorColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardPanel>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
            <DashboardPanel title="Errors by Language" subtitle="Which languages generate the most issues">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.languageErrors}>
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="url(#languageBarGradient)" />
                    <defs>
                      <linearGradient id="languageBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardPanel>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="xl:col-span-2">
            <DashboardPanel title="Coding Activity" subtitle="Error frequency over the last week">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.activityOverTime}>
                    <XAxis dataKey="date" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardPanel>
          </motion.div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <DashboardPanel title="Personalized Learning" subtitle="LSTM-driven study recommendations">
          <div className="grid gap-4 md:grid-cols-3">
            {dashboardData.learning.topics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{topic.description}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-primary-500/15 to-accent-500/15 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">Next Skill to Focus</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{dashboardData.learning.nextSkill}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Your recent patterns suggest this is the fastest path to reducing repeated errors.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">Improvement Streak</p>
            <div className="mt-4 flex items-end gap-4">
              <p className="text-5xl font-semibold text-slate-950 dark:text-white">{dashboardData.learning.improvementStreak}</p>
              <p className="pb-1 text-sm text-slate-500 dark:text-slate-400">days of consistent progress</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full rounded-full bg-linear-to-r from-primary-600 to-accent-600" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
