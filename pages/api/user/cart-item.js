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
    res.status(401).json({ message: "Not authorized to perform action!" });
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (err) {
    return res.status(500).json({ message: "Connecting to server failed!" });
  }

  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: session.user.email });

  if (!user) {
    client.close();
    return res.status(500).json({ message: "Could not perform operation!" });
  }

  let cart = user.cart;

  if (req.method === "PATCH") {
    const { slug, size, updatedQuantity, fromCart } = req.body;

    const existingItem = cart.find(
      (item) => item.slug === slug && item.size === size
    );

    if (!existingItem) {
      client.close();
      return res.status(500).json({ message: "Could not perform operation!" });
    }

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
      if (index === -1) {
        client.close();
        return res
          .status(500)
          .json({ message: "Could not perform operation!" });
      }

      cart.splice(index, 1);
    }
    if (all === true) {
      cart = [];
    }
  }

  if (req.method === "POST") {
    const { name, price, slug, size, imgLink, quantity } = req.body;

    if (!name || !price || !slug || !size || !imgLink || !quantity) {
      client.close();
      return res.status(500).json({ message: "Could not perform operation!" });
    }

    const newItem = {
      name,
      price,
      slug,
      size,
      imgLink,
      quantity,
    };

    cart.push(newItem);
  }
  let updatedResult;
  try {
    updatedResult = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { cart: cart } }
    );
    if (updatedResult.modifiedCount === 0) {
      throw new Error("Couldn't perform operation!");
    }
  } catch (err) {
    client.close();
    console.log(err.message);
    return res
      .status(500)
      .json({ message: err.message || "Could not perform operation!" });
  }

  client.close();
  return res.json({ message: "success" });
};

export default handler;
