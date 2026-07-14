import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's best to not use a global variable
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise;

// Helper to get database
export async function getDatabase() {
  const client = await clientPromise;
  return client.db('roadster');
}

// Helper to get bookings collection
export async function getBookingsCollection() {
  const db = await getDatabase();
  return db.collection('bookings');
}

// Helper to get reviews collection
export async function getReviewsCollection() {
  const db = await getDatabase();
  return db.collection('reviews');
}
