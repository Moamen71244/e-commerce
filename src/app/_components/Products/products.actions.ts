"use server";
import { CartResponse } from "@/app/interfaces";
import { DecodeToken } from "@/app/utilities";
export async function addToCart(id:string){
   const Token = await DecodeToken()
   const bodyObj = {
    productId: id
   }
    if (Token) {
        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
                method:"post",
                headers:{token:Token, "Content-Type":"application/json"},
                body:JSON.stringify(bodyObj)
            }
           )
            const finalres = await res.json()
            return finalres as CartResponse
        } catch (error) {
            console.log(error);
        }
    }
}

