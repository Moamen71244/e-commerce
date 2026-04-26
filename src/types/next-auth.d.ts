import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's custom id from the API. */
      id: string
      /** The user's token for authorization. */
      userToken: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    userToken: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string
    userTokenForAuthrization: string
  }
}
