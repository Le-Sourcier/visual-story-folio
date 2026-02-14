import { Router } from 'express';
import { getAllSettings, updateSettings } from '../controllers/settings.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/settings - Public (portfolio pages need this)
router.get('/', getAllSettings);

// PUT /api/settings - Admin only
router.put('/', authMiddleware, adminMiddleware, updateSettings);

export default router;
