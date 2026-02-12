import { Router } from 'express';
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
  getActiveSubscribers,
  getStats,
} from '../controllers/newsletter.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { subscribeValidator, unsubscribeValidator } from '../validators/newsletter.validator.js';

const router = Router();

/**
 * @swagger
 * /api/newsletter/subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       409:
 *         description: Already subscribed
 */
router.post('/subscribe', validate(subscribeValidator), subscribe);

/**
 * @swagger
 * /api/newsletter/unsubscribe:
 *   post:
 *     summary: Unsubscribe from newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Unsubscribed successfully
 *       404:
 *         description: Email not found
 */
router.post('/unsubscribe', validate(unsubscribeValidator), unsubscribe);

/**
 * @swagger
 * /api/newsletter/subscribers:
 *   get:
 *     summary: Get all subscribers (admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscribers
 */
router.get('/subscribers', authMiddleware, adminMiddleware, getAllSubscribers);

/**
 * @swagger
 * /api/newsletter/subscribers/active:
 *   get:
 *     summary: Get active subscribers (admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active subscribers
 */
router.get('/subscribers/active', authMiddleware, adminMiddleware, getActiveSubscribers);

/**
 * @swagger
 * /api/newsletter/stats:
 *   get:
 *     summary: Get newsletter statistics (admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Newsletter stats
 */
router.get('/stats', authMiddleware, adminMiddleware, getStats);

export default router;
