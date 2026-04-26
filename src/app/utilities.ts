"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function DecodeToken():Promise<string | null>{
    const cookie = await cookies()
    const encrToken = cookie.get("next-auth.session-token")?.value
    const decrToken = await decode({secret:process.env.NEXTAUTH_SECRET!,token:encrToken})
    if (decrToken) {
        return decrToken.userTokenForAuthrization as string
    }else{
        return null
    }
}