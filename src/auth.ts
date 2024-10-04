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
        try {
          const res = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch");
          }

          const user = await res.json();

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
});
