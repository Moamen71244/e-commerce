import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Continue with Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      authorize: async (credentials) => {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const finalres = await res.json();
        if (res.ok) {
          const { name, email } = finalres.user;
          const data: { id: string } = jwtDecode(finalres.token);

          return {
            name,
            email,
            id: data.id,
            userToken: finalres.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userTokenForAuthrization = user.userToken;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userToken = token.userTokenForAuthrization as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
