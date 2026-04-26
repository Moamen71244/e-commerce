import { getWishlist } from "./wishlist.actions";
import WishlistContent from "./WishlistContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | FreshCart",
  description: "View and manage your favorite items.",
};

export default async function WishlistPage() {
  const wishlistData = await getWishlist();

  return <WishlistContent initialWishlist={wishlistData?.data || []} />;
}
