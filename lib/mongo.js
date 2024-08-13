import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.DB_STRING);

  return client;
};

export const getByField = async (filter) => {
  const client = await connectToDatabase();
  if (!client) {
    return;
  }
  const db = client.db();
  let result;
  try {
    result = await db
      .collection("products")
      .find(filter, { projection: { _id: 0 } })
      .toArray();
    // console.log("--------------------------------------" + result)
  } catch (error) {
    client.close();
    console.log(error);
    return;
  }
  client.close();
  return result;
};
