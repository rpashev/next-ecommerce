import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/mongo";

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    jwt(token, cart) {
      if (cart) {
        return { user: cart };
      }
      return token;
    },
    session(session, token) {
      return token;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        let client;
        client = await connectToDatabase();

        if (!client) {
          throw new Error("Could not connect to server!");
        }

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          console.log("here");
          client.close();
          throw new Error("No user with this email!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password!");
        }

        let cart = JSON.parse(credentials.stringifiedCart);

        if (cart.length > 0) {
          try {
            await usersCollection.updateOne(
              { email: credentials.email },
              { $set: { cart: cart } }
            );
          } catch (err) {
            client.close();

            return res.status(500).json({ message: "Could not login!" });
          }
        }

        client.close();

        return {
          email: user.email,
          name: { firstName: user.firstName, lastName: user.lastName },
          cart: user.cart,
          // cart here and set redux state on front end
        };
      },
    }),
  ],
});
