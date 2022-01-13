import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/mongo";

const handler = async (req, res) => {
  if (!req.method === "POST") {
    return;
  }
  const data = req.body;

  const { firstName, lastName, email, password, confirmPassword } = data;

  if (
    !firstName ||
    !lastName ||
    !email.includes("@") ||
    !email.includes(".") ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    res.status(422).json({ message: "Invalid input!" });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    client.close();
    return res
      .status(422)
      .json({ message: "User with this email already exists" });
  }

  const hashedPassword = await hashPassword(password);

  let result;
  try {
    result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    console.log(err);
    client.close();
    return res.status(500).json({ message: "Could not create user" });
  }
  client.close();
  res.status(201).json({ message: "User is created" });
};

export default handler;
