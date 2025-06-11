// next-auth.d.ts
import { DefaultSession, DefaultJWT } from "next-auth";

// Extend the Session interface
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string; // Add the 'id' property here
    } & DefaultSession["user"];
  }
}

// Extend the JWT interface
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string; // Add the 'id' property here
  }
}