"use server";

import { verifyAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/products";
import { redirect } from "next/navigation";

const errorResponse = (client, message) => {
  let errors = [];
  client.close();
  errors.push({ message });
  return { data: null, errors };
};

export const updateCart = async (formData) => {
  let errors = [];
  let client = await connectToDatabase();
  if (!client) {
    return errorResponse(client, "Server error!");
  }

  const auth = await verifyAuth();
  if (!auth?.user) {
    return errorResponse(client, "Action not allowed!");
  }

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ _id: auth.user.id });
  if (!user) {
    return errorResponse(client, "Action not allowed!");
  }

  const slug = formData.get("slug");
  const size = formData.get("size");
  const updatedQuantity = formData.get("updatedQuantity");
  const fromCart = formData.get("fromCart");

  let cart = user.cart;

  const existingItem = cart.find(
    (item) => item.slug === slug && item.size === size
  );

  if (!existingItem) {
    return errorResponse(client, "Could not update cart!");
  }

  if (fromCart) {
    existingItem.quantity = updatedQuantity;
  } else {
    existingItem.quantity += updatedQuantity;
  }
  let updatedResult;
  try {
    updatedResult = await usersCollection.updateOne(
      { _id: auth.user.id },
      { $set: { cart: cart } }
    );
    if (updatedResult.modifiedCount === 0) {
      return errorResponse(client, "Could not update cart!");
    }
  } catch (err) {
    return errorResponse(client, "Could not update cart!");
  }

  client.close();

  return {
    data: null,
    errors,
  };
};
