import { NextResponse } from "next/server";
import { formatErrorResponse } from "./errors";

/**
 * Higher-order function to wrap API Route Handlers (GET, POST, etc.) for consistent error handling.
 * Automatically catches errors and returns a standardized JSON response with correct status codes.
 */
export function safeApi(handler) {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      const formatted = formatErrorResponse(error);
      
      return NextResponse.json(
        { 
          success: false, 
          error: formatted.error 
        }, 
        { status: formatted.statusCode }
      );
    }
  };
}
