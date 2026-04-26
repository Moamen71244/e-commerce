import { CartResponse } from "@/app/interfaces";
import { DecodeToken } from "@/app/utilities";

export async function getCart(): Promise<CartResponse | null> {
    const decodedToken = await DecodeToken();
    if (!decodedToken) return null
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: decodedToken
        }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
}