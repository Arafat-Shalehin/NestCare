import { formatErrorResponse } from "./errors";

/**
 * Higher-order function to wrap Server Actions for consistent error handling.
 * Automatically catches errors, logs them, and returns a standardized error contract.
 */
export function safeAction(action) {
  return async (...args) => {
    try {
      const result = await action(...args);
      
      // If the action already returns a structured object, pass it through
      if (result && typeof result === 'object' && 'success' in result) {
        return result;
      }
      
      return { success: true, data: result };
    } catch (error) {
      const formatted = formatErrorResponse(error);
      return { 
        success: false, 
        error: formatted.error 
      };
    }
  };
}
