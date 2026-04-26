"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Lock, Minus, ShieldCheck, Tag, Trash2, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "../_components/AddToCartButton/AddToCartButton";
import { cartContext } from "../_context/CartDataProvider";
import { CartResponse, itemsCart } from "../interfaces";
import { clearCart, removeFromCart, updateProductCount } from "./cart.actions";
import FreeShippingBar from "../_components/FreeShippingBar/FreeShippingBar";

const formatEgp = (value: number) => new Intl.NumberFormat("en-US").format(value) + " EGP";

type CartState = {
  numOfCartItems: number;
  totalCartPrice: number;
  products: itemsCart[];
};

function toCartState(cartData: CartResponse): CartState {
  return {
    numOfCartItems: cartData.numOfCartItems ?? 0,
    totalCartPrice: cartData.data?.totalCartPrice ?? 0,
    products: cartData.data?.products ?? [],
  };
}

export default function CartContent({ initialCartData }: { initialCartData: CartResponse }) {
  const [cartState, setCartState] = useState<CartState>(() => toCartState(initialCartData));
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const { UpdateCartData } = useContext(cartContext);

  function applyCartUpdate(nextData: CartResponse) {
    const next = toCartState(nextData);
    setCartState(next);
    UpdateCartData(next.numOfCartItems);
  }

  async function handleRemoveProduct(productId: string) {
    if (loadingProductId || isClearing) return;
    setLoadingProductId(productId);
    try {
      const response = await removeFromCart(productId);
      if (response) {
        applyCartUpdate(response);
      }
    } finally {
      setLoadingProductId(null);
    }
  }

  async function handleClearCart() {
    if (loadingProductId || isClearing) return;
    setIsClearing(true);
    try {
      const response = await clearCart();
      if (response) {
        applyCartUpdate(response);
      } else {
        setCartState({ numOfCartItems: 0, totalCartPrice: 0, products: [] });
        UpdateCartData(0);
      }
    } finally {
      setIsClearing(false);
    }
  }

  async function handleUpdateCount(productId: string, count: number) {
    if (loadingProductId || isClearing || count < 1) return;
    setLoadingProductId(productId);
    try {
      const response = await updateProductCount(productId, count);
      if (response) {
        applyCartUpdate(response);
      }
    } finally {
      setLoadingProductId(null);
    }
  }

  const cartItems = cartState.products;
  const shippingCost = cartState.totalCartPrice >= 500 || cartState.totalCartPrice === 0 ? 0 : 50;
  const finalTotal = cartState.totalCartPrice + shippingCost;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs text-muted-foreground sm:text-sm">
        <Link href="/" className="text-muted-foreground hover:text-green-700">
          Home /
        </Link>{" "}
        <span className="mx-2 text-black">Shopping Cart</span>
      </p>
      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <Card className="rounded-2xl px-4 py-6 sm:px-6">
              <CardTitle className="text-xl">Your cart is empty</CardTitle>
              <CardDescription className="mt-2">Start adding products to see them here.</CardDescription>
            </Card>
          ) : (
            cartItems.map((item, index) => (
              <Card
                key={item._id}
                className="gap-0 rounded-2xl px-4 py-5 shadow-[0_8px_24px_rgba(16,24,40,0.06)] sm:px-6"
              >
                <CardContent className="grid gap-4 px-0 sm:grid-cols-[100px_1fr_auto] sm:items-center">
                  <div className="h-21.5 w-21.5 rounded-md bg-linear-to-br from-neutral-100 to-neutral-300 p-1">
                    <img src={item.product.imageCover} alt={item.product.title} className="h-full w-full object-cover" />
                  </div>

                  <div>
                    <h2 className="text-xl font-medium text-foreground">{item.product.title}</h2>
                    <p className="mt-1 text-sm text-green-600">{item.product.category.name}</p>
                    <p className="mt-2 text-2xl font-semibold text-green-600">
                      {item.price}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">per unit</span>
                    </p>
                  </div>

                    <div className="justify-self-start sm:justify-self-end">
                      <p className="text-right text-md text-muted-foreground">Total</p>
                      <p className="text-2xl font-semibold text-foreground">{formatEgp(item.price * item.count)}</p>
                    </div>
                  </CardContent>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <Badge className="rounded-full bg-green-600 px-4 py-1 text-xs font-semibold text-white hover:bg-green-600">
                    {item.product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>

                  <div className="flex items-center rounded-lg border border-border bg-background">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 rounded-none text-muted-foreground hover:text-foreground ${item.count <= 1 || loadingProductId === item.product._id ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      aria-label={`Decrease ${item.product.title} quantity`}
                      disabled={item.count <= 1 || loadingProductId === item.product._id}
                      onClick={() => handleUpdateCount(item.product._id, item.count - 1)}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-10 text-center text-base font-medium">
                      {loadingProductId === item.product._id ? (
                        <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full mx-auto" />
                      ) : (
                        item.count
                      )}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 cursor-pointer rounded-none text-muted-foreground hover:text-foreground ${loadingProductId === item.product._id ? "cursor-not-allowed opacity-50" : ""}`}
                      aria-label={`Increase ${item.product.title} quantity`}
                      disabled={loadingProductId === item.product._id}
                      onClick={() => handleUpdateCount(item.product._id, item.count + 1)}
                    >
                      <span className="text-xl">+</span>
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-auto h-10 w-10 cursor-pointer rounded-4 border-[#FFC9C9] bg-[#FEF2F2] group hover:border-[#FB2C36] hover:bg-[#FB2C36]"
                    aria-label={`Remove ${item.product.title}`}
                    disabled={Boolean(loadingProductId) || isClearing}
                    onClick={() => handleRemoveProduct(item.product._id)}
                  >
                    <svg
                      className="fill-[#FB2C36] group-hover:fill-white"
                      width={13}
                      height={15}
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.73789 0.598828L3.5 1.3125H0.875C0.391016 1.3125 0 1.70352 0 2.1875C0 2.67148 0.391016 3.0625 0.875 3.0625H11.375C11.859 3.0625 12.25 2.67148 12.25 2.1875C12.25 1.70352 11.859 1.3125 11.375 1.3125H8.75L8.51211 0.598828C8.3918 0.240625 8.0582 0 7.68086 0H4.56914C4.1918 0 3.8582 0.240625 3.73789 0.598828ZM11.375 4.375H0.875L1.45195 13.2098C1.4957 13.9016 2.06992 14.4375 2.76172 14.4375H9.48828C10.1801 14.4375 10.7543 13.9016 10.798 13.2098L11.375 4.375Z" />
                    </svg>
                  </Button>
                </div>

                {index !== cartItems.length - 1 && (
                  <Separator className="mt-5 border-t border-dashed bg-transparent" />
                )}
              </Card>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <Link href="/" className="text-green-700 hover:underline">
              ← Continue Shopping
            </Link>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground transition hover:text-foreground"
              onClick={handleClearCart}
              disabled={cartItems.length === 0 || isClearing || Boolean(loadingProductId)}
            >
              <span className="inline-flex items-center gap-2">
                <Trash2 size={14} />
                Clear all items
              </span>
            </Button>
          </div>
        </div>

        <Card className="h-fit gap-0 overflow-hidden rounded-2xl py-0 shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
          <CardHeader className="gap-1 bg-green-600 px-5 py-4 text-white">
            <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
            <CardDescription className="text-sm text-green-100">
              {cartState.numOfCartItems} items in your cart
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-5">
            <FreeShippingBar total={cartState.totalCartPrice} />

            <div className="space-y-3 pb-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatEgp(cartState.totalCartPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {shippingCost === 0 ? "FREE" : formatEgp(shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">{formatEgp(finalTotal)}</span>
              </div>
            </div>
            <Separator className="border-t border-dashed bg-transparent" />

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="h-11 w-full">
                <Tag size={16} />
                Apply
              </Button>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button
                type="button"
                className="h-11 w-full bg-green-600 text-base font-semibold text-white hover:bg-green-700"
              >
                <Lock size={16} />
                Secure Checkout
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-600" />
                Secure Payment
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck size={14} className="text-green-600" />
                Fast Delivery
              </span>
            </div>

            <div className="text-center text-sm">
              <Link href="/" className="text-green-700 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
