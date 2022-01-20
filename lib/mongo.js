import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  let client;
  const connectionString =
    "mongodb://rosko_kz:Rossen91kz@cluster0-shard-00-00.cpss2.mongodb.net:27017,cluster0-shard-00-01.cpss2.mongodb.net:27017,cluster0-shard-00-02.cpss2.mongodb.net:27017/ecommerce-app?ssl=true&replicaSet=atlas-dg8hi2-shard-0&authSource=admin&retryWrites=true&w=majority";
  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    console.log(error);

    return;
  }

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


