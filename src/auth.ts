import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data: user } = await axios.post(
          "http://localhost:4000/api/users/login",
          credentials
        );
        // console.log("auth ts response", user);

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt", token, user);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session, token);
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
});
