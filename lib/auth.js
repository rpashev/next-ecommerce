import { hash, compare } from "bcryptjs";
import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

import { connectToDatabase } from "./products";
import { cookies } from "next/headers";

let client;
let db;
let User;
let Session;
let lucia;

async function initDb() {
  if (!client) {
    client = await connectToDatabase();

    db = client.db();
    User = db.collection("users");
    Session = db.collection("sessions");

    const mongoAdapter = new MongodbAdapter(Session, User);
    lucia = new Lucia(mongoAdapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
    });
  }
}

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export const createAuthSession = async (userId) => {
  await initDb();
  try {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (err) {
    console.log(err);
  }
};

export const verifyAuth = async () => {
  await initDb();

  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return null;
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return null;
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
};

export const destroySession = async () => {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
