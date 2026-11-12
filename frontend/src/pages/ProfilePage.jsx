import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as authApi from '../api/authApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    preferredLanguage: user?.preferredLanguage || 'en',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await updateProfile(profile);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authApi.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setMessage('Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {message && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleProfileSave}
        className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
        <div className="mt-4 space-y-4">
          <Input
            label="Name"
            name="name"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Preferred Language
            </label>
            <select
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={profile.preferredLanguage}
              onChange={(e) =>
                setProfile((p) => ({ ...p, preferredLanguage: e.target.value }))
              }
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="both">English + Hindi</option>
            </select>
          </div>
          <Button type="submit" loading={loading}>
            Save Profile
          </Button>
        </div>
      </form>

      <form
        onSubmit={handlePasswordChange}
        className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Change Password</h2>
        <div className="mt-4 space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, currentPassword: e.target.value }))
            }
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))
            }
          />
          <Button type="submit" variant="secondary" loading={loading}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
