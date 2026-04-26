"use client";

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Heart, Share2, Plus, Minus } from "lucide-react";
import { addToCart } from "../Products/products.actions";
import { toast } from "sonner";
import { cartContext } from "@/app/_context/CartDataProvider";

export default function ProductActions({
  productId,
  price,
  available,
}: {
  productId: string;
  price: number;
  available: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { UpdateCartData } = useContext(cartContext);

  const totalPrice = price * quantity;

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // If RouteMisr API doesn't support generic quantity on POST, 
      // we can do a loop, or just add one and let them update count in cart.
      // Usually users add 1. We will add 1 by 1 if quantity > 1.
      let lastRes = null;
      for (let i = 0; i < quantity; i++) {
        lastRes = await addToCart(productId);
      }
      
      if (lastRes && typeof lastRes.numOfCartItems === "number") {
        UpdateCartData(lastRes.numOfCartItems);
        toast.success(`Added ${quantity} item(s) to your cart!`);
      } else {
         toast.error("Failed to add to cart");
      }
    } catch (error) {
      toast.error("An error occurred adding the product.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Quantity & Stock */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-500">Quantity</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-3 text-gray-500 hover:text-gray-900 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(available, q + 1))}
              disabled={quantity >= available}
              className="p-3 text-gray-500 hover:text-gray-900 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {available} available
          </span>
        </div>
      </div>

      {/* Total Price Bar */}
      <div className="flex justify-between items-center py-4 border-t border-b border-gray-100 bg-gray-50/30 px-2 rounded-lg">
        <span className="text-gray-500 font-medium">Total Price:</span>
        <span className="text-2xl font-black text-green-600">
          {(totalPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP
        </span>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12"
        >
          <ShoppingCart className="mr-2" size={18} />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-[#0B1A28] hover:bg-[#1A2A38] text-white font-bold h-12"
        >
          <Zap className="mr-2" size={18} />
          Buy Now
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Button variant="outline" className="w-full h-12 text-gray-600 border-gray-200">
          <Heart className="mr-2" size={18} />
          Add to Wishlist
        </Button>
        <Button variant="outline" className="w-12 h-12 px-0 text-gray-600 border-gray-200">
          <Share2 size={18} />
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 mt-4 py-4 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="p-2 bg-green-50 text-green-600 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div className="text-[10px]">
            <p className="font-bold text-gray-900">Free Delivery</p>
            <p className="text-gray-500">Orders over $50</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="p-2 bg-green-50 text-green-600 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </div>
          <div className="text-[10px]">
            <p className="font-bold text-gray-900">30 Days Return</p>
            <p className="text-gray-500">Money back</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="p-2 bg-green-50 text-green-600 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
          </div>
          <div className="text-[10px]">
            <p className="font-bold text-gray-900">Secure Payment</p>
            <p className="text-gray-500">100% Protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
