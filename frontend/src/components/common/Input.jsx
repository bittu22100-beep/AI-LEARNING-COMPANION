export default function Input({
  label,
  error,
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:ring-2 focus:ring-primary-500/30 dark:bg-slate-900 dark:text-slate-100 ${
          error
            ? 'border-red-400 dark:border-red-500'
            : 'border-slate-200 dark:border-slate-700 focus:border-primary-500'
        }`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
