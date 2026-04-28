const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export const collections = {
  SERVICES: "services",
  USERS: "users",
  BOOKINGS: "bookings",
  TIMELINE: "timeline",
  LOCATIONS: "locations",
};


let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

/**
 * Returns the raw MongoClient for transactions
 */
export async function getMongoClient() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    const opts = {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    cached.promise = MongoClient.connect(uri, opts).then((client) => client);
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

/**
 * Returns a specific collection or the DB instance
 */
export async function dbConnect(cname) {
  const client = await getMongoClient();
  const db = client.db(dbName);
  
  if (cname) {
    return db.collection(cname);
  }
  return db;
}
