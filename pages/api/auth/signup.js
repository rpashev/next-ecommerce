import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/mongo";

const handler = async (req, res) => {
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

  const hashedPassword = hashPassword(password);
  
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
    return res.status(500).json({ message: "Could not create user" });
  }

  res.status(201).json({ message: "User is created" });
};

export default handler;
