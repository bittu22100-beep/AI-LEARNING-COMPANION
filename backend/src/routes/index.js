const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'AI Learning Companion API',
    version: '1.0.0',
    message: 'API is running. Use the endpoints below.',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile',
        changePassword: 'PUT /api/auth/change-password',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'PUT /api/auth/reset-password/:token',
      },
    },
  });
});

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Learning Companion API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

// Future route modules (Phase 2+)
// router.use('/materials', materialRoutes);
// router.use('/ai', aiRoutes);
// router.use('/quizzes', quizRoutes);
// router.use('/flashcards', flashcardRoutes);
// router.use('/notes', noteRoutes);
// router.use('/chat', chatRoutes);
// router.use('/analytics', analyticsRoutes);

module.exports = router;
