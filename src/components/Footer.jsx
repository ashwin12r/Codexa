export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]/80 py-6 text-sm text-slate-300 backdrop-blur-2xl transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Codexa</p>
          <p className="mt-1 text-sm text-slate-400">Developer tooling, analysis, and insight in one workspace.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a href="https://github.com/your-username/codexa" className="transition hover:text-white">
            GitHub
          </a>
          <a href="/about" className="transition hover:text-white">
            About
          </a>
          <a href="mailto:contact@codexa.dev" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}