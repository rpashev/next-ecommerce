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

  let cart = user.cart;

  if (req.method === "PATCH") {
    const { slug, size, updatedQuantity, fromCart } = req.body;

    const existingItem = cart.find(
      (item) => item.slug === slug && item.size === size
    );

    if (fromCart) {
      existingItem.quantity = updatedQuantity;
    } else {
      existingItem.quantity += updatedQuantity;
    }
  }

  if (req.method === "DELETE") {
    const { slug, size, all } = req.body;

    if (slug && size && !all) {
      const index = cart.findIndex(
        (item) => item.slug === slug && item.size === size
      );

      cart.splice(index, 1);
    }
    if (all === true) {
      cart = [];
    }
  }

  if (req.method === "POST") {
    const newItem = req.body;
    cart.push(newItem);
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
