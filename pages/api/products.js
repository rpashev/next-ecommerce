// import { products } from "../../dummy";
// import { MongoClient } from "mongodb";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     let client;
//     const connectionString =
//       "mongodb://rosko_kz:Rossen91kz@cluster0-shard-00-00.cpss2.mongodb.net:27017,cluster0-shard-00-01.cpss2.mongodb.net:27017,cluster0-shard-00-02.cpss2.mongodb.net:27017/ecommerce-app?ssl=true&replicaSet=atlas-dg8hi2-shard-0&authSource=admin&retryWrites=true&w=majority";
//     try {
//       client = await MongoClient.connect(connectionString);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Could not connect to database." });
//       return;
//     }

//     const db = client.db();

//     try {
//       const result = await db.collection("products").insertMany(products);
//       console.log(result);
//     } catch (error) {
//       client.close();
//       console.log(error);
//       res.status(500).json({ message: "Storing message failed!" });
//       return;
//     }

//     client.close();
//     res.status(201).json({ message: "Successfully stored data!" });
//   }
// };

// export default handler;
