import { getCart } from "@/ApiServices/cart.servicies";
import CheckoutForm from "../_components/Checkout/CheckoutForm";
import { ChevronRight, ClipboardList, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const cartData = await getCart();

  if (!cartData || cartData.numOfCartItems === 0) {
    redirect("/cart");
  }

  const cartId = cartData.data._id;
  const totalAmount = cartData.data.totalCartPrice;
  const products = cartData.data.products;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white mt-10">
      {/* 🟢 HEADER SECTION - Matching Screenshot */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex gap-4">
          <div className="bg-green-600 p-2 rounded-lg text-white">
            <ClipboardList size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
            <p className="text-gray-500 font-medium">Review your items and complete your purchase</p>
          </div>
        </div>
        
        <Link 
          href="/cart" 
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
        >
          <span className="text-lg">←</span> Back to Cart
        </Link>
      </div>

      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 border-b pb-4">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/cart" className="hover:text-green-600 transition-colors">Cart</Link>
        <ChevronRight size={12} />
        <span className="text-gray-900 font-semibold">Checkout</span>
      </nav>

      {/* 📦 FORM SECTION */}
      <section>
        <CheckoutForm 
          cartId={cartId} 
          totalAmount={totalAmount} 
          products={products}
        />
      </section>
    </main>
  );
}
