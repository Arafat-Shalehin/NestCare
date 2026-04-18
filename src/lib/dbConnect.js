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
};

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function dbConnect(cname) {
  if (cached.conn) {
    return cached.conn.db(dbName).collection(cname);
  }

  if (!cached.promise) {
    const opts = {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Optimization: Add pool size and connection timeouts
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = MongoClient.connect(uri, opts).then((client) => {
      return client;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn.db(dbName).collection(cname);
}
