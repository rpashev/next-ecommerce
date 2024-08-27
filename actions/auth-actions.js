"use server";

import {
  createAuthSession,
  destroySession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { connectToDatabase } from "@/lib/products";
import { validateEmail } from "@/utils/validators";
import { redirect } from "next/navigation";

export const registerUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const confirmPassword = formData.get("confirmPassword");
  const stringifiedCart = formData.get("cart");

  let errors = [];

  console.log(formData);
  if (
    !firstName ||
    !lastName ||
    !validateEmail(email) ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    errors.push({
      message: "Invalid input. Check your input and try again.",
      code: "401",
    });
    return { data: null, errors };
  }

  let client = await connectToDatabase();
  if (!client) {
    errors.push({ message: "Server error!" });
    return { data: null, errors };
  }
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({ email: email });
  if (existingUser) {
    console.log("from exist");
    client.close();
    errors.push({
      message: "Invalid credentials. Check your input and try again.",
    });
    return { data: null, errors };
  }

  const hashedPassword = await hashPassword(password);
  let result;
  let cart = JSON.parse(stringifiedCart);

  try {
    result = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      cart,
    });
  } catch (err) {
    console.log(err);
    client.close();
    errors.push({ message: "Could not create user." });
    return { data: null, errors };
  }
  const user = await usersCollection.findOne({ email: email });
  await createAuthSession(user._id);

  client.close();

  return {
    data: {
      email: user.email,
      name: { firstName: user.firstName, lastName: user.lastName },
      cart: user.cart,
    },
    errors,
  };
};

export const loginUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const stringifiedCart = formData.get("cart");

  let errors = [];
  console.log(formData);
  if (!validateEmail(email) || password.length < 6) {
    errors.push({
      message: "Invalid credentials. Check you input and try again.",
    });
  }

  let client = await connectToDatabase();
  if (!client) {
    errors.push({ message: "Server error!" });
    return { data: null, errors };
  }

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: email });

  if (!user) {
    console.log("no user");
    client.close();

    errors.push({
      message: "Invalid credentials. Check your input and try again.",
    });
    return { data: null, errors };
  }
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    client.close();
    errors.push({
      message: "Invalid credentials. Check your input and try again.",
    });
    return { data: null, errors };
  }

  let cart = JSON.parse(stringifiedCart);
  if (cart?.length > 0) {
    try {
      await usersCollection.updateOne(
        { email: email },
        { $set: { cart: cart } }
      );
    } catch (err) {
      client.close();

      errors.push({ message: "Could not login!" });
      return { data: null, errors };
    }
  }
  console.log(user._id.toString());
  await createAuthSession(user._id);
  client.close();

  return {
    data: {
      email: user.email,
      name: { firstName: user.firstName, lastName: user.lastName },
      cart: user.cart,
    },
    errors,
  };
};

export const logoutUser = async () => {
  try {
    await destroySession();
    return { success: true };
  } catch {
    return { success: false };
  }
};
