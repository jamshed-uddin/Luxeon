import { User as AppUser } from "@/lib/definition";

declare module "next-auth" {
  //   interface User extends AppUser {}
  interface Session {
    user: AppUser;
  }
}
