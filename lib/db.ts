import { MongoClient, type Db, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "pool-forever";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb() {
  if (!uri) return null;
  if (cachedDb) return cachedDb;

  cachedClient = cachedClient || new MongoClient(uri);
  await cachedClient.connect();
  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

export async function getCollection<T extends Document = Document>(name: string) {
  const db = await getDb();
  return db?.collection<T>(name) || null;
}
