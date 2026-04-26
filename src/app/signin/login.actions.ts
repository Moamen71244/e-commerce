"use server";

import { loginObj } from "./login.types";

export async function loginAction (data:loginObj){


    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
            method :"post",
            body: JSON.stringify(data),
            headers:{
                "content-type" : "application/json"
            }
        })

        if(res.ok){
            console.log("success Register");
        }else{
            console.log("failed Register");
        }
        return res.ok
    } catch (error) {
        console.log("ERR",error);
        
    }


}
