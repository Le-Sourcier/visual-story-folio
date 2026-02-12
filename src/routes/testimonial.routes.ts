import { Router } from 'express';
import {
  getAllTestimonials,
  getVisibleTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleVisibility,
} from '../controllers/testimonial.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createTestimonialValidator,
  updateTestimonialValidator,
  testimonialIdValidator,
} from '../validators/testimonial.validator.js';

const router = Router();

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get visible testimonials (public)
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of visible testimonials
 */
router.get('/', getVisibleTestimonials);

/**
 * @swagger
 * /api/testimonials/all:
 *   get:
 *     summary: Get all testimonials (admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all testimonials
 */
router.get('/all', authMiddleware, adminMiddleware, getAllTestimonials);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Testimonial details
 *       404:
 *         description: Testimonial not found
 */
router.get('/:id', validate(testimonialIdValidator), getTestimonialById);

/**
 * @swagger
 * /api/testimonials:
 *   post:
 *     summary: Create a testimonial (admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               company:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testimonial created
 */
router.post('/', authMiddleware, adminMiddleware, validate(createTestimonialValidator), createTestimonial);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   put:
 *     summary: Update a testimonial (admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Testimonial updated
 */
router.put('/:id', authMiddleware, adminMiddleware, validate(updateTestimonialValidator), updateTestimonial);

/**
 * @swagger
 * /api/testimonials/{id}/visibility:
 *   patch:
 *     summary: Toggle testimonial visibility (admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Visibility toggled
 */
router.patch('/:id/visibility', authMiddleware, adminMiddleware, validate(testimonialIdValidator), toggleVisibility);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial (admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Testimonial deleted
 */
router.delete('/:id', authMiddleware, adminMiddleware, validate(testimonialIdValidator), deleteTestimonial);

export default router;
