"use client";

import { useEffect, useState } from "react";
import { product } from "../interfaces";
import ProductCard from "../_components/Products/ProductCard";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlist } from "../_context/WishlistDataProvider";

export default function WishlistContent({ initialWishlist }: { initialWishlist: product[] }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [items, setItems] = useState<product[]>(initialWishlist);

  // Sync local items with global wishlistIds (removes item from UI if removed via card toggle)
  useEffect(() => {
    setItems(prev => prev.filter(item => wishlistIds.includes(item._id || item.id)));
  }, [wishlistIds]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 mb-6 text-red-500">
          <Heart size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Save your favorite items here to keep track of them and buy them later.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 rounded-xl px-10">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-none">My Wishlist</h1>
            <p className="text-gray-500 mt-2 font-medium">
              You have {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="rounded-xl border-gray-200 text-gray-600 hover:text-green-600">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item._id || item.id} className="relative group">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
