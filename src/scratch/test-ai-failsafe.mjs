/**
 * Standing Logic Test for AI Heuristic Fallback
 */

function deterministicHeuristicMatch(selections, services) {
  const need = (selections.need || "").toLowerCase();
  let targetSlug = "sick-care"; 
  
  if (need.includes("baby") || need.includes("infant") || need.includes("child")) {
    targetSlug = "baby-care";
  } else if (need.includes("elderly") || need.includes("senior") || need.includes("grand")) {
    targetSlug = "elderly-care";
  } else if (need.includes("adult") || need.includes("sick") || need.includes("patient")) {
    targetSlug = "sick-care";
  }

  const exists = services.some(s => s.slug === targetSlug);
  return {
    serviceSlug: exists ? targetSlug : (services[0]?.slug || "general-care"),
    confidence: 0.1,
    reason: "Heuristic fallback match."
  };
}

const mockServices = [
  { slug: "baby-care" },
  { slug: "elderly-care" },
  { slug: "sick-care" }
];

console.log("--- Testing Heuristic Fallback Logic ---");

const testCases = [
  { selections: { need: "Baby Care" }, expected: "baby-care" },
  { selections: { need: "Elderly Support" }, expected: "elderly-care" },
  { selections: { need: "Sick Person" }, expected: "sick-care" },
  { selections: { need: "Unknown" }, expected: "sick-care" }
];

testCases.forEach((tc, i) => {
  const result = deterministicHeuristicMatch(tc.selections, mockServices);
  const pass = result.serviceSlug === tc.expected;
  console.log(`Test ${i+1}: ${tc.selections.need} -> ${result.serviceSlug} [${pass ? 'PASS' : 'FAIL'}]`);
});
