export default function PlaceholderPage({ title, description, phase = 2 }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <span className="text-5xl">🚧</span>
      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
      <span className="mt-4 rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
        Phase {phase} — Coming next
      </span>
    </div>
  );
}
