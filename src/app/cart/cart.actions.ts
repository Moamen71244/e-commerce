"use server";

import { CartResponse } from "../interfaces";
import { DecodeToken } from "../utilities";

export async function removeFromCart(productId: string): Promise<CartResponse | null> {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    const finalRes = await res.json();
    return finalRes as CartResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProductCount(productId: string, count: number): Promise<CartResponse | null> {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    if (!res.ok) return null;
    const finalRes = await res.json();
    return finalRes as CartResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function clearCart(): Promise<CartResponse | null> {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    const finalRes = await res.json();
    return finalRes as CartResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}