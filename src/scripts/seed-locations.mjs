import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

async function seedLocations() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");
    const locations = db.collection("locations");

    // 1. Get some caregivers from the database
    const caregivers = await users.find({ role: "caregiver" }).limit(5).toArray();
    
    if (caregivers.length === 0) {
      console.log("No caregivers found in 'users' collection to seed locations for.");
      return;
    }

    // 2. Clear existing locations
    await locations.deleteMany({});

    // 3. Seed locations near Dhaka center
    const dhakaCenter = [90.4125, 23.8103]; // [lng, lat]
    
    const seedData = caregivers.map((c, i) => ({
      caregiverId: c._id,
      coordinates: [
        dhakaCenter[0] + (Math.random() - 0.5) * 0.05,
        dhakaCenter[1] + (Math.random() - 0.5) * 0.05,
      ],
      status: "active",
      updatedAt: new Date(),
    }));

    await locations.insertMany(seedData);
    console.log(`✅ Seeded ${seedData.length} caregiver locations.`);

  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seedLocations();
