import { collections, dbConnect } from '../src/lib/dbConnect.js';
import { ObjectId } from 'mongodb';

console.log("--- Testing Timeline Integrity Logic ---");

async function verifyTimelineIntegrity() {
  const bookingsCollection = await dbConnect(collections.BOOKINGS);
  const timelineCollection = await dbConnect(collections.TIMELINE);

  // 1. Create a dummy booking
  const dummyCaregiverId = new ObjectId();
  const dummyUserId = new ObjectId();
  const bookingResult = await bookingsCollection.insertOne({
    serviceName: "Integrity Test Service",
    caregiverId: dummyCaregiverId,
    userId: dummyUserId,
    status: "CONFIRMED",
    createdAt: new Date()
  });
  const bookingId = bookingResult.insertedId;

  console.log(`Created test booking: ${bookingId}`);

  // 2. Simulate logic of addTimelineEvent
  const simulateAddEvent = async (actingUserId, role) => {
    console.log(`\nAttempting to add event as User: ${actingUserId} (${role})`);
    
    // Server-side check logic:
    const booking = await bookingsCollection.findOne({ _id: bookingId });
    const isAssignedCaregiver = booking.caregiverId.toString() === actingUserId.toString();
    const isAdmin = role === "admin";

    if (!isAssignedCaregiver && !isAdmin) {
      console.log("❌ ACCESS DENIED: Only assigned caregivers or admins can post.");
      return false;
    }

    console.log("✅ ACCESS GRANTED");
    return true;
  };

  // Test Case A: Assigned Caregiver
  await simulateAddEvent(dummyCaregiverId, "caregiver");

  // Test Case B: Unauthorized Caregiver
  await simulateAddEvent(new ObjectId(), "caregiver");

  // Test Case C: Admin
  await simulateAddEvent(new ObjectId(), "admin");

  // Cleanup
  await bookingsCollection.deleteOne({ _id: bookingId });
  console.log("\nCleanup finished.");
}

verifyTimelineIntegrity().then(() => {
  console.log("✅ Integrity Logic Verification Finished.");
});
