import { ApiError, formatErrorResponse } from '../src/lib/errors.js';
import { safeAction } from '../src/lib/safeAction.js';

console.log("--- Testing Unified Error Contract ---");

// 1. Test ApiError creation
const err = ApiError.badRequest("Missing fields", "VALIDATION_ERROR", { email: ["Invalid format"] });
console.log("ApiError Object:", JSON.stringify(err, null, 2));

// 2. Test Formatter
const formatted = formatErrorResponse(err);
console.log("\nFormatted API Response:", JSON.stringify(formatted, null, 2));

// 3. Test safeAction wrapper
const mockAction = async (fail = false) => {
  if (fail) {
    throw ApiError.unauthorized("Expired token");
  }
  return { id: 1, name: "NestCare" };
};

const safeMockAction = safeAction(mockAction);

async function runTests() {
  console.log("\n--- Testing safeAction (Success Case) ---");
  const successResult = await safeMockAction(false);
  console.log(JSON.stringify(successResult, null, 2));

  console.log("\n--- Testing safeAction (Error Case) ---");
  const errorResult = await safeMockAction(true);
  console.log(JSON.stringify(errorResult, null, 2));
}

runTests().then(() => {
  console.log("\n✅ Error Handling Verification Finished.");
});
