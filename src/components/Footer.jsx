export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 py-6 text-sm text-slate-600 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">Codexa</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Developer tooling, analysis, and insight in one workspace.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a href="https://github.com/your-username/codexa" className="transition hover:text-primary-600 dark:hover:text-primary-300">
            GitHub
          </a>
          <a href="/about" className="transition hover:text-primary-600 dark:hover:text-primary-300">
            About
          </a>
          <a href="mailto:contact@codexa.dev" className="transition hover:text-primary-600 dark:hover:text-primary-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}