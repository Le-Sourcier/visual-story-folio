import { body, param } from 'express-validator';

export const createProjectValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['UI/UX', 'Branding', 'Web', 'Art', 'Photo', 'Fullstack', 'Software'])
    .withMessage('Invalid category'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Invalid image URL'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('problem')
    .trim()
    .notEmpty()
    .withMessage('Problem is required'),
  body('solution')
    .trim()
    .notEmpty()
    .withMessage('Solution is required'),
  body('results')
    .isArray()
    .withMessage('Results must be an array'),
  body('metrics')
    .isArray()
    .withMessage('Metrics must be an array'),
  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid project URL'),
];

export const updateProjectValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid project ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  body('category')
    .optional()
    .trim()
    .isIn(['UI/UX', 'Branding', 'Web', 'Art', 'Photo', 'Fullstack', 'Software'])
    .withMessage('Invalid category'),
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid image URL'),
  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid project URL'),
];

export const projectIdValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid project ID'),
];
