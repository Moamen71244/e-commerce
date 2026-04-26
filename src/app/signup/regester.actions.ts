"use server";

import { log } from "console";
import { regObj } from "./regester.types";
import { cookies } from "next/headers";

export async function regesterAction (data:regObj){

    const cookie = await cookies()
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
            method :"post",
            body: JSON.stringify(data),
            headers:{
                "content-type" : "application/json"
            }
        })
        const finalRes = await res.json()
        if(res.ok){
            console.log("success Register");
            cookie.set("token",finalRes.token,{
                httpOnly:true,
                maxAge: 60 * 60 * 24 ,
                sameSite: "lax",
            })
        }else{
            console.log("failed Register");
        }
        return res.ok
    } catch (error) {
        console.log("ERR",error);
        
    }


}
