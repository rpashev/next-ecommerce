import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/mongo";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user with this credentials!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Couldn't log you in!");
        }

        // if credentials.cart.length > 0, set user's cart on db to credentials.cart

        client.close();

        return {
          email: user.email,
          name: { firstName: user.firstName, lastName: user.lastName },
          // cart here and set redux state on front end
        };
      },
    }),
  ],
});
