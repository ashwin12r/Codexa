import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaMoon, FaSun, FaXmark } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/70"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
          Codexa
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-4 py-2 transition-colors duration-200',
                    isActive
                      ? 'bg-primary-500/10 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                      : 'hover:bg-slate-900/5 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {menuOpen ? <FaXmark className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 md:hidden"
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-xl px-4 py-3 transition-colors duration-200',
                      isActive
                        ? 'bg-primary-500/10 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                        : 'hover:bg-slate-900/5 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}