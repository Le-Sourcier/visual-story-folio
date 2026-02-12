import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiSuccessResponse,
  ApiPaginatedResponse,
  ApiErrorResponse,
  ErrorCode,
  HttpStatus,
  HttpStatusCode,
  PaginationMeta,
} from '../types/response.types.js';

const createMeta = () => ({
  timestamp: new Date().toISOString(),
  requestId: uuidv4(),
});

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Operation successful',
  statusCode: HttpStatusCode = HttpStatus.OK
): Response => {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    meta: createMeta(),
  };
  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message = 'Data retrieved successfully'
): Response => {
  const response: ApiPaginatedResponse<T> = {
    success: true,
    message,
    data,
    pagination,
    meta: createMeta(),
  };
  return res.status(HttpStatus.OK).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  code: ErrorCode = ErrorCode.INTERNAL_ERROR,
  statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  details?: string
): Response => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    error: {
      code,
      details,
    },
    meta: createMeta(),
  };
  return res.status(statusCode).json(response);
};

export const sendNotFound = (res: Response, resource = 'Resource'): Response => {
  return sendError(
    res,
    `${resource} not found`,
    ErrorCode.NOT_FOUND,
    HttpStatus.NOT_FOUND
  );
};

export const sendUnauthorized = (res: Response, message = 'Unauthorized'): Response => {
  return sendError(res, message, ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
};

export const sendForbidden = (res: Response, message = 'Access forbidden'): Response => {
  return sendError(res, message, ErrorCode.FORBIDDEN, HttpStatus.FORBIDDEN);
};

export const sendValidationError = (res: Response, details: string): Response => {
  return sendError(
    res,
    'Validation error',
    ErrorCode.VALIDATION_ERROR,
    HttpStatus.BAD_REQUEST,
    details
  );
};

export const sendConflict = (res: Response, message: string): Response => {
  return sendError(res, message, ErrorCode.CONFLICT, HttpStatus.CONFLICT);
};

export const sendCreated = <T>(res: Response, data: T, message = 'Created successfully'): Response => {
  return sendSuccess(res, data, message, HttpStatus.CREATED);
};

export default {
  sendSuccess,
  sendPaginated,
  sendError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  sendValidationError,
  sendConflict,
  sendCreated,
};
