import { MongoClient, ServerApiVersion } from "mongodb";

// No need for dotenv, run with: node --env-file=.env src/scripts/init-db.mjs



const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

if (!uri) {
  console.error("❌ MONGODB_URI is missing in .env.local");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);

    // --- USERS Collection ---
    console.log("Setting up 'users' indexes...");
    const users = db.collection("users");
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ role: 1 });

    // --- BOOKINGS Collection ---
    console.log("Setting up 'bookings' indexes...");
    const bookings = db.collection("bookings");
    await bookings.createIndex({ userId: 1 });
    // Compound index for conflict detection (Atomic Booking Integrity)
    await bookings.createIndex(
      { caregiverId: 1, status: 1, startTime: 1, endTime: 1 },
      { name: "caregiver_schedule_conflict_idx" }
    );
    await bookings.createIndex({ status: 1 });

    // --- TIMELINE Collection ---
    console.log("Setting up 'timeline' indexes...");
    const timeline = db.collection("timeline");
    await timeline.createIndex({ bookingId: 1 });
    await timeline.createIndex({ userId: 1 });

    console.log("✅ All production indexes ensured successfully.");
  } catch (err) {
    console.error("❌ Initialization failed:", err);
  } finally {
    await client.close();
  }
}

run();
