import { hash, compare } from "bcryptjs";
import axios from "axios";

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const response = await axios.post("/api/auth/signup", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
  return response;
};
