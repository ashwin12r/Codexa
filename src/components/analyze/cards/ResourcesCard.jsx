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
            className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-primary-500/30 hover:bg-white dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-white/5"
          >
            <h3 className="font-semibold text-slate-950 transition group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">
              {resource.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{resource.description}</p>
            <span className="mt-4 inline-flex rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
              Open Resource
            </span>
          </a>
        ))}
      </div>
    </CardShell>
  )
}