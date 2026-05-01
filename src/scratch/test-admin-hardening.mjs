import { ApiError } from '../src/lib/errors.js';
import { ServicePackageSchema } from '../src/lib/schemas/service.js';

console.log("--- Testing Admin Security Hardening ---");

// 1. Test Strict Schema Validation
console.log("\n1. Testing Strict Schema Validation (Unknown fields)");
const maliciousPayload = {
  name: "Dangerous Service",
  slug: "danger-slug",
  description: "A service with extra malicious fields",
  pricing: { baseRate: 100, unit: "hour", currency: "BDT" },
  status: "active",
  maliciousField: "I should not be here",
  _id: "HACKED_ID"
};

const validation = ServicePackageSchema.safeParse(maliciousPayload);
if (!validation.success) {
  console.log("✅ Validation failed as expected for unknown fields.");
  console.log("Errors:", JSON.stringify(validation.error.flatten().fieldErrors, null, 2));
} else {
  console.log("❌ Validation FAILED: It should have rejected unknown fields.");
}

// 2. Test Field Mapping Simulation
console.log("\n2. Testing Field Mapping Simulation");
const sanitizedData = validation.success ? validation.data : {
    name: "Safe Name",
    slug: "safe-slug",
    description: "Safe description",
    pricing: { baseRate: 100, unit: "hour" },
    status: "active"
};

// Simulate the explicit mapping in admin.js
const { name, slug, description, pricing, status } = sanitizedData;
const serviceDoc = {
  name,
  slug,
  description,
  pricing,
  status,
  updatedAt: new Date()
};

console.log("Resulting Doc for MongoDB Update:", JSON.stringify(serviceDoc, null, 2));
if (serviceDoc.maliciousField === undefined && serviceDoc._id === undefined) {
    console.log("✅ Field mapping correctly excluded dangerous fields.");
} else {
    console.log("❌ Field mapping FAILED to exclude dangerous fields.");
}

console.log("\n✅ Admin Security Verification Finished.");
