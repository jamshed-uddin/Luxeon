import { User as AppUser } from "@/lib/definition";

declare module "next-auth" {
  interface User extends AppUser {
    authToken: string;
  }
  interface Session {
    user: AppUser;
  }
}
