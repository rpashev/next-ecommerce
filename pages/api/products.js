// import { products } from "../../dummy";
// import { MongoClient } from "mongodb";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     let client;
//     const connectionString =
//       process.env.DB_STRING;
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
