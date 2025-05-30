import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "TEACHER" | "STUDENT" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: "TEACHER" | "STUDENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "TEACHER" | "STUDENT" | "ADMIN";
  }
}
