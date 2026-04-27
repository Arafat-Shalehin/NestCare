/**
 * Custom error class for API and Server Action failures
 */
export class ApiError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', statusCode = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message, code = 'BAD_REQUEST', details = null) {
    return new ApiError(message, code, 400, details);
  }

  static unauthorized(message = 'Unauthorized access', code = 'UNAUTHORIZED') {
    return new ApiError(message, code, 401);
  }

  static forbidden(message = 'Forbidden', code = 'FORBIDDEN') {
    return new ApiError(message, code, 403);
  }

  static notFound(message = 'Resource not found', code = 'NOT_FOUND') {
    return new ApiError(message, code, 404);
  }

  static conflict(message, code = 'CONFLICT') {
    return new ApiError(message, code, 409);
  }
}

import logger from './logger';

/**
 * Centralized error handler to transform any error into a standardized API response
 */
export function formatErrorResponse(error) {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
      statusCode: error.statusCode,
    };
  }

  // Handle generic errors (like DB timeouts, etc.)
  logger.error("Unhandled Exception caught by Global Handler", { error: error.message }, error);

  return {
    success: false,
    error: {
      message: 'An unexpected error occurred. Please try again later.',
      code: 'INTERNAL_SERVER_ERROR',
    },
    statusCode: 500,
  };
}
