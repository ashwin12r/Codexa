import { apiClient } from './apiClient'

export const mockDashboardData = {
  stats: {
    mostFrequentError: 'NameError',
    favoriteLanguage: 'Python',
    currentStreak: 12,
    weeklyProgress: 78,
  },
  recentAnalyses: [
    { date: '2026-07-25', language: 'Python', errorType: 'NameError', severity: 'High' },
    { date: '2026-07-24', language: 'JavaScript', errorType: 'TypeError', severity: 'Medium' },
    { date: '2026-07-22', language: 'C++', errorType: 'SyntaxError', severity: 'Low' },
    { date: '2026-07-21', language: 'Java', errorType: 'IndexError', severity: 'Medium' },
  ],
  errorDistribution: [
    { name: 'NameError', value: 34 },
    { name: 'SyntaxError', value: 23 },
    { name: 'IndexError', value: 18 },
    { name: 'TypeError', value: 25 },
  ],
  languageErrors: [
    { name: 'Python', value: 41 },
    { name: 'JavaScript', value: 29 },
    { name: 'Java', value: 14 },
    { name: 'C++', value: 11 },
  ],
  activityOverTime: [
    { date: 'Mon', value: 2 },
    { date: 'Tue', value: 4 },
    { date: 'Wed', value: 3 },
    { date: 'Thu', value: 6 },
    { date: 'Fri', value: 5 },
    { date: 'Sat', value: 8 },
    { date: 'Sun', value: 7 },
  ],
  learning: {
    nextSkill: 'Debugging variable scope and initialization',
    improvementStreak: 6,
    topics: [
      { title: 'Variable Scope', description: 'Learn where variables are visible and how to initialize them properly.' },
      { title: 'Control Flow', description: 'Practice tracing conditions, loops, and branching logic.' },
      { title: 'Reading Stack Traces', description: 'Understand how to read error output and locate the root cause.' },
    ],
  },
}

const USE_MOCK = String(import.meta.env.VITE_USE_MOCK ?? 'true').toLowerCase() !== 'false'

const sleep = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))

/**
 * Load dashboard analytics data with either mock fixtures or the backend API.
 *
 * @returns {Promise<Object>} Resolves to dashboard stats, recent analyses, charts, and learning recommendations.
 *
 * Behavior:
 * - Uses mock dashboard data when VITE_USE_MOCK is not set to false.
 * - Waits briefly in mock mode to simulate loading.
 * - Sends a GET request to /api/dashboard when real API mode is enabled.
 */
export async function getDashboardData() {
  if (USE_MOCK) {
    await sleep(1200)
    return mockDashboardData
  }

  const response = await apiClient.get('/api/dashboard')
  return response.data?.data ?? response.data
}
