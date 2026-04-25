import { MongoClient } from "mongodb";

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.DBNAME);
    const services = await db.collection("services").find({ status: "active" }).toArray();
    console.log(JSON.stringify(services.map(s => ({ name: s.name, slug: s.slug })), null, 2));
  } finally {
    await client.close();
  }
}
run();
