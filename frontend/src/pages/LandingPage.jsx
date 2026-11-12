import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import ThemeToggle from '../components/layout/ThemeToggle';

const features = [
  { icon: '📄', title: 'Smart Summaries', desc: 'Upload PDFs and get AI-powered summaries instantly.' },
  { icon: '✅', title: 'Auto Quizzes', desc: 'Generate MCQs with scoring and performance analytics.' },
  { icon: '🃏', title: 'Flashcards', desc: 'Spaced repetition flashcards for long-term retention.' },
  { icon: '💬', title: 'Contextual Chat', desc: 'Ask doubts from your uploaded study materials.' },
  { icon: '🎯', title: 'Weakness Detection', desc: 'AI identifies weak topics from quiz performance.' },
  { icon: '🌐', title: 'Multi-Language', desc: 'Learn in English and Hindi with simple explanations.' },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-primary-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🧠</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">AI Learning Companion</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center lg:px-8 lg:py-28">
        <div className="animate-fade-in">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            AI-Powered Learning Platform
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Learn Smarter with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
              Your AI Tutor
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Upload study materials, get summaries, quizzes, flashcards, and personalized roadmaps.
            Your resume-worthy MERN + AI learning companion.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg">Start Learning Free</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-white">
          Everything you need to ace your exams
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
