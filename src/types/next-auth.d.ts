import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    user: {
      email: string;
      name: string;
      role: string;
      image?: string;
    };
    token: string;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      role: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: string;
      name: string;
      role: string;
      image?: string;
    };
    token: string;
  }
}
