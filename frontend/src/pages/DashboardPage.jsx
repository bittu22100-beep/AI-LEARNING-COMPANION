import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const quickActions = [
  { to: '/upload', label: 'Upload Material', icon: '📤', color: 'from-blue-500 to-cyan-500' },
  { to: '/chat', label: 'AI Chat', icon: '💬', color: 'from-violet-500 to-purple-500' },
  { to: '/quizzes', label: 'Take Quiz', icon: '✅', color: 'from-emerald-500 to-teal-500' },
  { to: '/flashcards', label: 'Flashcards', icon: '🃏', color: 'from-amber-500 to-orange-500' },
];

const stats = [
  { label: 'Materials', value: '0', sub: 'Upload to get started' },
  { label: 'Quizzes Taken', value: '0', sub: 'Coming in Phase 2' },
  { label: 'Study Streak', value: '0', sub: 'days' },
  { label: 'Topics Mastered', value: '0', sub: 'AI tracking soon' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 p-6 text-white shadow-lg lg:p-8">
        <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="mt-2 max-w-xl text-primary-100">
          Your AI learning hub is ready. Upload study materials next to unlock summaries, quizzes,
          and personalized recommendations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`group rounded-xl bg-gradient-to-br ${action.color} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="mt-3 font-semibold">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="mt-4 text-sm text-slate-500">No activity yet. Upload your first material!</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">AI Recommendations</h3>
          <p className="mt-4 text-sm text-slate-500">
            Personalized study tips will appear here after you upload content and take quizzes.
          </p>
        </div>
      </div>
    </div>
  );
}
