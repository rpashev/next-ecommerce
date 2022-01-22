import axios from "axios";
// import { connectToDatabase } from "./mongo";

export const updateCart = async (
  slug,
  size = "M",
  quantity = 1,
  fromCart = false
) => {
  try {
    await axios.patch("/api/user/cart-item", {
      slug,
      size,
      updatedQuantity: quantity,
      fromCart,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = async (slug, size, all = false) => {
  try {
    await axios.delete("/api/user/cart-item", {
      data: {
        slug,
        size,
        all,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (payload) => {
  try {
    await axios.post("/api/user/cart-item", payload);
  } catch (err) {
    console.log(err.message);
  }
};

// export const getAllCartItems = async (email) => {
//   const client = await connectToDatabase();
//   if (!client) {
//     return;
//   }
//   const db = client.db();
//   const user = await db.collection("users").findOne({ email: email });
//   if (!user) {
//     throw new Error({ message: "No such user" });
//   }

//   return user.cart;
// };
