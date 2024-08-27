"use server";

import { validateEmail } from "@/utils/validators";

export const registerUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const confirmPassword = formData.get("confirmPassword");
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
      message: "Invalid input. Check the data and try again.",
      code: "401",
    });
  }
  return { data: null, errors };
};

export const loginUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = [];
  console.log(formData);
  if (!validateEmail(email) || password.length < 6) {
    errors.push({
      message: "Invalid input. Check the data and try again.",
      code: "401",
    });
  }
  return { data: null, errors };
};
