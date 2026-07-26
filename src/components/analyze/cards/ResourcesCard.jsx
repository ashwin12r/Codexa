import CardShell from './CardShell'

export default function ResourcesCard({ resources = [] }) {
  return (
    <CardShell title="Resources" subtitle="Helpful references to keep learning">
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-[18px] border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
          >
            <h3 className="font-semibold text-white transition group-hover:text-cyan-200">
              {resource.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{resource.description}</p>
            <span className="mt-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              Open Resource
            </span>
          </a>
        ))}
      </div>
    </CardShell>
  )
}