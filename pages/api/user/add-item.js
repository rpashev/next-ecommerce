import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/mongo";

const handler = async (req, res) => {
  if (
    req.method !== "PATCH" &&
    req.method !== "DELETE" &&
    req.method !== "POST"
  ) {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authorized to perfomr action!" });
    return;
  }

  const client = await connectToDatabase();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: session.user.email });

  const cart = user.cart;

  if (req.method === "PATCH") {
    const { slug, size, updatedQuantity } = req.body;

    const existingItem = cart.find(
      (item) => item.slug === slug && item.size === size
    );

    existingItem.quantity += updatedQuantity;
  }

  try {
    await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { cart: cart } }
    );
  } catch (err) {
    client.close();
    console.log(err);
    return res.status(500).json({ message: "Could not login!" });
  }

  client.close();
  return res.json({ message: "success" });
};

export default handler;
