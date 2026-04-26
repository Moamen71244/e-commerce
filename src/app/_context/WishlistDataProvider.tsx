"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addToWishlist, removeFromWishlist, getWishlist } from "../wishlist/wishlist.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistDataProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const fetchWishlist = useCallback(async () => {
    if (status !== "authenticated") return;
    try {
      const res = await getWishlist();
      if (res && res.status === "success") {
        setWishlistIds(res.data.map((item: any) => item._id || item.id));
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  }, [status]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId: string) => {
    if (status !== "authenticated") {
      toast.error("Please sign in to manage your wishlist");
      return;
    }

    const isCurrentlyIn = wishlistIds.includes(productId);
    
    // Optimistic UI update
    if (isCurrentlyIn) {
      setWishlistIds(prev => prev.filter(id => id !== productId));
    } else {
      setWishlistIds(prev => [...prev, productId]);
    }

    try {
      if (isCurrentlyIn) {
        const res = await removeFromWishlist(productId);
        if (res && res.status === "success") {
          toast.success("Removed from wishlist");
        } else {
          // Revert if failed
          setWishlistIds(prev => [...prev, productId]);
          toast.error("Failed to remove from wishlist");
        }
      } else {
        const res = await addToWishlist(productId);
        if (res && res.status === "success") {
          toast.success("Added to wishlist");
        } else {
          // Revert if failed
          setWishlistIds(prev => prev.filter(id => id !== productId));
          toast.error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      // Revert if error
      if (isCurrentlyIn) {
        setWishlistIds(prev => [...prev, productId]);
      } else {
        setWishlistIds(prev => prev.filter(id => id !== productId));
      }
      toast.error("Something went wrong");
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const contextValue = useMemo(() => ({
    wishlistIds,
    toggleWishlist,
    isInWishlist,
    isLoading
  }), [wishlistIds, isLoading]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistDataProvider");
  }
  return context;
}
