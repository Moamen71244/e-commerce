import { CartResponse, OrderResponse } from "@/app/interfaces";

const BASE_URL = "https://ecommerce.routemisr.com";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

/**
 * Creates a cash order
 */
export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/v2/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to create cash order:", error);
    return null;
  }
}

/**
 * Creates an online payment (card) order and returns the checkout session URL
 */
export async function createOnlineOrder(cartId: string, shippingAddress: ShippingAddress, token: string) {
  try {
    // Determine the base URL for redirection after payment
    const baseUrl = window.location.origin;
    
    const res = await fetch(`${BASE_URL}/api/v2/orders/checkout-session/${cartId}?url=${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to create online order:", error);
    return null;
  }
}

/**
 * Fetches all orders for a specific user
 */
export async function getUserOrders(userId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}
