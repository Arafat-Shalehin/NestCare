import logger, { logContext } from '../src/lib/logger.js';

console.log("--- Testing Logger JSON Structure & Redaction ---");

// Simulate a request context
const requestId = "test-req-123";
const userId = "user-abc";

logContext.run({ requestId, userId }, () => {
  logger.info("Test log with context");
  
  logger.warn("Test log with sensitive data", { 
    password: "SECRET_PASSWORD_123",
    user: {
      email: "test@example.com",
      token: "SENSITIVE_TOKEN_XYZ"
    }
  });

  try {
    throw new Error("Simulated Database Error");
  } catch (err) {
    logger.error("Test error log", { query: "SELECT * FROM users" }, err);
  }
});

console.log("\n✅ Verification script finished. Check console output for JSON/Pretty-print formatting.");
