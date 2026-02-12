import { body, param } from 'express-validator';

export const createTestimonialValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isLength({ max: 100 })
    .withMessage('Role must be less than 100 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company must be less than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('avatar')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid avatar URL'),
];

export const updateTestimonialValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid testimonial ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('role')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Role must be less than 100 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];

export const testimonialIdValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid testimonial ID'),
];
