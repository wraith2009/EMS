import "next-auth";

declare module "next-auth" {
  interface User {
    user_id?: Int;
    role?: string;
  }
  interface Session {
    user_id?: Int;
    role?: string;
  }
}
