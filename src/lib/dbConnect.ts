import { MongoClient, ServerApiVersion, Collection, Document } from "mongodb";

export const collectionNameObj = {
  userCollection: 'usersData',
  productCollection: 'productData',
  orderCollection: 'ordersData',
}

export const dbConnect = <T extends Document = Document>(collectionName: string): Collection<T> => {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
  const dbName = process.env.NEXT_PUBLIC_DB_NAME as string;

  if (!uri) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_MONGODB_URI");
  }

  if (!dbName) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_DB_NAME");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  return client.db(dbName).collection<T>(collectionName);
};
