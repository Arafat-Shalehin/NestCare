const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

export const collections = {
  SERVICES: "services",
  USERS: "users",
  BOOKINGS: "bookings",
  TIMELINE: "timeline",
};
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (cname) => {
  return client.db(dbName).collection(cname);
};
