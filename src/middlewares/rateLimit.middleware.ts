import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';
import { ErrorCode, HttpStatus } from '../types/response.types.js';

export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    error: {
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      details: `Rate limit exceeded. Try again in ${config.rateLimit.windowMs / 60000} minutes.`,
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many login attempts, please try again later',
    error: {
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      details: 'Too many login attempts. Try again in 15 minutes.',
    },
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 messages per hour
  message: {
    success: false,
    message: 'Too many messages sent, please try again later',
    error: {
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      details: 'You can only send 5 messages per hour.',
    },
  },
});

export default { apiLimiter, authLimiter, contactLimiter };
