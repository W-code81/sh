import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null; //the finished, connected mongoose instance
  promise: Promise<typeof mongoose> | null; //a connection attempt that’s currently in progress.
};

declare global {
  // Keep a single connection while Next.js reloads server modules in development.
  var mongooseCache: MongooseCache | undefined;
}

const cache = (globalThis.mongooseCache ??= { //checks if there's a global running connection exists
  connection: null, 
  promise: null,
});

export default async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined"); //fast fail for uri issues

  if (cache.connection) return cache.connection; //if already existing connection retrun it 

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri).catch((error: unknown) => {
      cache.promise = null;
      throw error;
    });
  }

  cache.connection = await cache.promise;
  return cache.connection;
}
