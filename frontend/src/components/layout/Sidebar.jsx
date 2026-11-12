import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/upload', label: 'Upload', icon: '📤' },
  { to: '/chat', label: 'AI Chat', icon: '💬' },
  { to: '/quizzes', label: 'Quizzes', icon: '✅' },
  { to: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { to: '/notes', label: 'Notes', icon: '📝' },
  { to: '/analytics', label: 'Analytics', icon: '📈' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 dark:border-slate-800">
          <span className="text-2xl">🧠</span>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">AI Learning</p>
            <p className="text-xs text-slate-500">Companion</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="mb-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {user?.name}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
            {user?.streak > 0 && (
              <p className="mt-1 text-xs text-primary-600 dark:text-primary-400">
                🔥 {user.streak} day streak
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
