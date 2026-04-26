"use server";

import { DecodeToken } from "../utilities";

export async function addToWishlist(productId: string) {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeFromWishlist(productId: string) {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getWishlist() {
  const token = await DecodeToken();
  if (!token) return null;

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token,
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
