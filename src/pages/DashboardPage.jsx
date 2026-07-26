import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FaArrowTrendUp, FaCode, FaFire, FaTriangleExclamation } from 'react-icons/fa6'
import { getDashboardData } from '../services/dashboardService'
import { useTheme } from '../context/ThemeContext'

const severityStyles = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  High: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

function DashboardStatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="glass-surface rounded-[18px] bg-white/6 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(59,130,246,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-linear-to-br from-primary-500/15 to-violet-500/15 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  )
}

function DashboardPanel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`glass-surface relative overflow-hidden rounded-[18px] bg-white/6 p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(59,130,246,0.24)] sm:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">{title}</p>
          {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()

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
  const recentAnalyses = dashboardData?.recentAnalyses ?? []
  const chartTextColor = theme === 'dark' ? '#cbd5e1' : '#475569'
  const chartBorderColor = theme === 'dark' ? 'rgba(148, 163, 184, 0.24)' : 'rgba(148, 163, 184, 0.3)'
  const chartBackgroundColor = theme === 'dark' ? 'rgba(2, 6, 23, 0.96)' : 'rgba(255, 255, 255, 0.98)'

  const filteredRecentAnalyses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return recentAnalyses
    }

    return recentAnalyses.filter((analysis) => {
      return [analysis.date, analysis.language, analysis.errorType, analysis.severity].some((value) =>
        String(value).toLowerCase().includes(query),
      )
    })
  }, [recentAnalyses, searchQuery])

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
        className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_-40px_rgba(2,6,23,0.8)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">Dashboard</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              Your coding progress at a glance
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Track recent analyses, explore trends, and follow personalized learning recommendations built from your coding history.
            </p>
          </div>
          <div className="rounded-[18px] border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
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
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="block flex-1">
                  <span className="sr-only">Search previous analyses</span>
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="search"
                    placeholder="Search previous analyses"
                    aria-label="Search previous analyses"
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                  />
                </label>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Showing {filteredRecentAnalyses.length} of {recentAnalyses.length}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="pb-3 pr-4 font-medium">Date</th>
                      <th className="pb-3 pr-4 font-medium">Language</th>
                      <th className="pb-3 pr-4 font-medium">Error</th>
                      <th className="pb-3 pr-4 font-medium">Severity</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecentAnalyses.length ? (
                      filteredRecentAnalyses.map((analysis) => (
                        <tr key={`${analysis.date}-${analysis.language}`} className="border-t border-white/10">
                          <td className="py-3 pr-4 text-slate-300">{analysis.date}</td>
                          <td className="py-3 pr-4 text-slate-300">{analysis.language}</td>
                          <td className="py-3 pr-4 font-medium text-white">{analysis.errorType}</td>
                          <td className="py-3 pr-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyles[analysis.severity]}`}>{analysis.severity}</span>
                          </td>
                          <td className="py-3">
                            <a href="/analyze" className="text-sm font-semibold text-cyan-200 hover:text-white">
                              View
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t border-white/10">
                        <td colSpan={5} className="py-6 text-center text-sm text-slate-400">
                          No analyses match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        backgroundColor: chartBackgroundColor,
                        border: `1px solid ${chartBorderColor}`,
                        borderRadius: '1rem',
                        color: chartTextColor,
                        boxShadow: '0 18px 50px -34px rgba(15, 23, 42, 0.45)',
                      }}
                      labelStyle={{ color: chartTextColor, fontWeight: 600 }}
                      itemStyle={{ color: chartTextColor }}
                    />
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
                    <XAxis dataKey="name" stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} />
                    <YAxis stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        backgroundColor: chartBackgroundColor,
                        border: `1px solid ${chartBorderColor}`,
                        borderRadius: '1rem',
                        color: chartTextColor,
                        boxShadow: '0 18px 50px -34px rgba(15, 23, 42, 0.45)',
                      }}
                      labelStyle={{ color: chartTextColor, fontWeight: 600 }}
                      itemStyle={{ color: chartTextColor }}
                    />
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
                    <XAxis dataKey="date" stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} />
                    <YAxis stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} />
                    <Tooltip
                      cursor={{ stroke: chartTextColor, strokeOpacity: 0.15 }}
                      contentStyle={{
                        backgroundColor: chartBackgroundColor,
                        border: `1px solid ${chartBorderColor}`,
                        borderRadius: '1rem',
                        color: chartTextColor,
                        boxShadow: '0 18px 50px -34px rgba(15, 23, 42, 0.45)',
                      }}
                      labelStyle={{ color: chartTextColor, fontWeight: 600 }}
                      itemStyle={{ color: chartTextColor }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
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
              <div key={topic.title} className="glass-surface rounded-[18px] bg-white/6 p-5">
                <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{topic.description}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="space-y-4">
          <div className="glass-surface rounded-[18px] bg-linear-to-br from-primary-500/10 to-violet-500/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">Next Skill to Focus</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{dashboardData.learning.nextSkill}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Your recent patterns suggest this is the fastest path to reducing repeated errors.
            </p>
          </div>

          <div className="glass-surface rounded-[18px] bg-white/6 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">Improvement Streak</p>
            <div className="mt-4 flex items-end gap-4">
              <p className="text-5xl font-semibold text-white">{dashboardData.learning.improvementStreak}</p>
              <p className="pb-1 text-sm text-slate-400">days of consistent progress</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-linear-to-r from-cyan-400 to-violet-500" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
