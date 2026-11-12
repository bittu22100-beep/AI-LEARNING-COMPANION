import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/upload"
          element={
            <PlaceholderPage
              title="Upload Study Material"
              description="Upload PDFs, notes, text, YouTube links, and documents. Multer + MongoDB storage coming in Phase 2."
            />
          }
        />
        <Route
          path="/chat"
          element={
            <PlaceholderPage
              title="AI Chat"
              description="Contextual chatbot powered by OpenAI/Gemini with chat history storage."
              phase={3}
            />
          }
        />
        <Route
          path="/quizzes"
          element={
            <PlaceholderPage
              title="Quiz System"
              description="MCQs, timed quizzes, score tracking, and performance analytics."
              phase={3}
            />
          }
        />
        <Route
          path="/flashcards"
          element={
            <PlaceholderPage
              title="Flashcards"
              description="Flip cards, favorites, and spaced repetition logic."
              phase={3}
            />
          }
        />
        <Route
          path="/notes"
          element={
            <PlaceholderPage
              title="Notes"
              description="AI-generated and custom notes with rich text editor."
              phase={3}
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <PlaceholderPage
              title="Progress Analytics"
              description="Streaks, topic completion, charts, and weekly progress."
              phase={4}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
