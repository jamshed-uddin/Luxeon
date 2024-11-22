import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data: user } = await axios.post(
          "http://localhost:4000/api/users/login",
          credentials
        );
        console.log("auth ts response", user);

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
});
