export default function TechBadge({ label, description }) {
  return (
    <div className="glass-surface flex h-full min-h-[164px] flex-col rounded-[18px] bg-white/6 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_24px_70px_-34px_rgba(139,92,246,0.25)]">
      <p className="text-base font-semibold text-white">{label}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p> : null}
    </div>
  )
}
