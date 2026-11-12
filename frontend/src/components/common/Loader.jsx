export default function Loader({ fullScreen = false, text = 'Loading...' }) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center py-12">{content}</div>;
}
