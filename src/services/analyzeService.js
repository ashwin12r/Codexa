import { apiClient } from './apiClient'

export const mockAnalysisResult = {
  error_type: 'NameError',
  severity: 'High',
  compiler_error: "NameError: name 'name' is not defined",
  line: 2,
  column: 7,
  faulty_token: 'name',
  suggested_token: 'userName',
  code_line_text: '    console.log(name)',
  explanation: 'You used a variable before declaring it.',
  why: 'The runtime could not find the variable because it was referenced before assignment.',
  suggested_fix: 'Define the variable before using it, then run the code again.',
  corrected_code: "const userName = 'John'\nconsole.log(userName)\n",
  diff: 'Updated the code to initialize the variable before logging it.',
  personalized_tip: 'You frequently make NameError mistakes. Try declaring variables before using them.',
  resources: [
    {
      title: 'Python Variables',
      description: 'Learn how variables work in Python.',
      url: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator',
    },
    {
      title: 'NameError Reference',
      description: 'Understand why NameError happens and how to avoid it.',
      url: 'https://docs.python.org/3/library/exceptions.html#NameError',
    },
  ],
  suggestions: ['Always initialize variables before using them.', 'Use meaningful variable names.', 'Run small tests after each change.'],
}

const USE_MOCK = String(import.meta.env.VITE_USE_MOCK ?? 'true').toLowerCase() !== 'false'

const sleep = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))

function normalizeResponse(data) {
  return data?.data ?? data
}

/**
 * Analyze source code with either mock data or the backend API.
 *
 * @param {Object} params - Analysis request payload.
 * @param {string} params.language - Selected programming language identifier.
 * @param {string} params.code - Source code to analyze.
 * @returns {Promise<Object>} Resolves to an analysis result object containing the detected issue, explanation, and corrected code.
 *
 * Behavior:
 * - Uses mock analysis data when VITE_USE_MOCK is not set to false.
 * - Waits briefly in mock mode to simulate network latency.
 * - Sends a POST request to /api/analyze when real API mode is enabled.
 */
export async function analyzeCode({ language, code }) {
  if (USE_MOCK) {
    await sleep(2500)
    return mockAnalysisResult
  }

  try {
    const response = await apiClient.post('/api/analyze', { language, code })
    return normalizeResponse(response.data)
  } catch (error) {
    throw error
  }
}

