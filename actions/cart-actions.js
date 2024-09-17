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
export const addToCart = async (formData) => {
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

  const name = formData.get("name");
  const price = formData.get("price");
  const slug = formData.get("slug");
  const imgLink = formData.get("imgLink");
  const size = formData.get("size");
  const quantity = formData.get("quantity");
  console.log(name);
  console.log(price);
  console.log(slug);

  if (!name || !price || !slug || !size || !imgLink || !quantity) {
    return errorResponse(client, "Could not add to cart!");
  }

  let cart = user.cart || [];

  const newItem = {
    name,
    price,
    slug,
    size,
    imgLink,
    quantity,
  };

  cart.push(newItem);
  console.log(cart);

  let updatedResult;

  try {
    updatedResult = await usersCollection.updateOne(
      { _id: auth.user.id },
      { $set: { cart: cart } }
    );
    if (updatedResult.modifiedCount === 0) {
      return errorResponse(client, "Could not add to cart!");
    }
  } catch (err) {
    return errorResponse(client, "Could not add to cart!");
  }

  client.close();

  return {
    data: null,
    errors,
  };
};
export const deleteFromCart = async (formData) => {
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
  const all = formData.get("all");
  let cart = user.cart || [];
  console.log(slug);
  console.log(size);
  console.log(all);
  if (!all && (!slug || !size)) {
    console.log("if");

    return errorResponse(client, "Could not delete item!");
  }

  if (slug && size && !all) {
    console.log("start delete");
    const index = cart.findIndex(
      (item) => item.slug === slug && item.size === size
    );
    console.log(index);

    if (index === -1) {
      console.log("index");
      return errorResponse(client, "Could not delete item!");
    }

    cart.splice(index, 1);
  }

  if (all) {
    cart = [];
  }

  let updatedResult;

  try {
    updatedResult = await usersCollection.updateOne(
      { _id: auth.user.id },
      { $set: { cart: cart } }
    );
    if (updatedResult.modifiedCount === 0) {
      return errorResponse(client, "Could not delete item!");
    }
  } catch (err) {
    console.log(err);
    return errorResponse(client, "Could not delete item!");
  }

  client.close();

  return {
    data: null,
    errors,
  };
};
