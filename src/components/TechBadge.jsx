export default function TechBadge({ label, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
      <p className="text-base font-semibold text-slate-950 dark:text-white">{label}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  )
}
