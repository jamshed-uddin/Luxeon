import { isAxiosError } from "axios";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { userSignup } from "./lib/userSignup";
import { requestClient } from "./lib/requestClient";
import { Address } from "./lib/definition";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    error: "/signin",
  },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const user = await requestClient<User>("/users/login", {
          method: "post",
          data: credentials,
        });

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      let userData: User | undefined = undefined;
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
            if (error.response?.status !== 309) {
              return false;
            }
          }
        }
      }

      try {
        const token = await requestClient<{ authToken: string }>(
          "/users/generateAuthToken",
          {
            method: "post",
            data: { email: user?.email, name: user?.name },
          }
        );
        authToken = token.authToken;

        if (!userData) {
          const userInfo = await requestClient<User>(`/users/${user.email}`, {
            method: "get",
          });

          userData = userInfo;
        }
      } catch {
        return false;
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
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session.address.length) {
        try {
          const res = await requestClient<{ address: Address[] }>(
            `/users/${(token.user as User)._id}`,
            {
              method: "patch",
              data: { address: session.address },
            }
          );

          (token.user as User).address = res?.address;
        } catch {
          return null;
        }
      }

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
