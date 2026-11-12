import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await forgotPassword(email);
      setMessage(data.data.message);
      if (data.data.resetUrl) {
        setMessage(`${data.data.message} (Dev link: ${data.data.resetUrl})`);
      }
    } catch (err) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {message && (
          <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" loading={loading}>
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="text-primary-600 hover:underline dark:text-primary-400">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
