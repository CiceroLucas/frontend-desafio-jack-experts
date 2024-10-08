import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
    };
  }

  interface User {
    access_token: string;
  }

  interface MyJwtPayload extends JwtPayload {
    name: string;
    email: string;
    sub: string;
  }
}
