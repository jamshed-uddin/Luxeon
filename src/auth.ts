import axios, { isAxiosError } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { userSignup } from "./lib/userSignup";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    error: "/signin",
  },
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
    async signIn({ account, user }) {
      let userData;
      let authToken;

      if (account?.provider === "google") {
        try {
          const { data } = await userSignup({
            name: user.name,
            email: user.email,
            provider: account?.provider,
          });
          userData = data;
        } catch (error) {
          if (isAxiosError(error)) {
            console.log(error.response);
            if (error.response?.status !== 309) {
              return false;
            }
          }
        }

        try {
          const { data: token } = await axios.post(
            "http://localhost:4000/api/users/generateAuthToken",
            { email: user?.email, name: user?.name }
          );
          authToken = token.authToken;

          if (!userData) {
            const { data: userInfo } = await axios.get(
              `http://localhost:4000/api/users/${user.email}`
            );

            userData = userInfo;
          }
        } catch {
          return false;
        }
      }

      user._id = userData?._id;
      user.name = userData?.name;
      user.email = userData?.email;
      user.role = userData?.role;
      user.address = userData?.address;
      user.authToken = authToken;
      user.createdAt = userData?.createdAt;
      user.updatedAt = userData?.updatedAt;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
});
