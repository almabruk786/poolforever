import { MongoClient, type Db, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "pool-forever";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb() {
  if (!uri) return null;
  if (cachedDb) return cachedDb;

  try {
    cachedClient = cachedClient || new MongoClient(uri, {
      connectTimeoutMS: 2000,
      serverSelectionTimeoutMS: 2000
    });
    await cachedClient.connect();
    cachedDb = cachedClient.db(dbName);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB, falling back to local file storage:", error);
    return null;
  }
}

export async function getCollection<T extends Document = Document>(name: string) {
  const db = await getDb();
  return db?.collection<T>(name) || null;
}

