"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Carrot, Citrus, Sprout, ShoppingCart, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-green-100 text-4xl animate-float" style={{ animationDelay: '0s' }}>
          <Apple size={48} />
        </div>
        <div className="absolute top-[20%] right-[10%] text-green-100 text-3xl animate-float" style={{ animationDelay: '1s' }}>
          <Carrot size={40} />
        </div>
        <div className="absolute bottom-[25%] left-[8%] text-green-100 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
          <Citrus size={40} />
        </div>
        <div className="absolute bottom-[15%] right-[15%] text-green-100 text-4xl animate-float" style={{ animationDelay: '2s' }}>
          <Sprout size={48} />
        </div>
        <div className="absolute top-[50%] left-[15%] text-green-50 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>
          <Apple size={32} />
        </div>
        <div className="absolute top-[40%] right-[5%] text-green-50 text-2xl animate-float" style={{ animationDelay: '0.8s' }}>
          <Carrot size={32} />
        </div>
        
        {/* Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-green-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-green-100/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-xl w-full">
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-green-100/50 rounded-[32px] blur-2xl"></div>
            <div className="relative w-64 h-52 sm:w-72 sm:h-60">
              <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-50/80 via-transparent to-green-100/40"></div>
                <ShoppingCart className="relative text-6xl sm:text-7xl text-green-400/80" />
              </div>
              
              {/* 404 Badge */}
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">404</span>
                  </div>
                </div>
              </div>

              {/* Decorative dots/smile */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="w-8 h-4 border-b-[3px] border-green-400 rounded-b-full"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Oops! Nothing Here</h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button asChild size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold gap-3 shadow-lg shadow-green-600/25 transition-all hover:-translate-y-1 py-4 px-3 h-auto">
            <Link href="/">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => router.back()}
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 rounded-2xl font-bold gap-3 border-gray-200 transition-all hover:-translate-y-1 py-4 px-3 h-auto shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Popular Destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'All Products', href: '/products', active: true },
              { label: 'Categories', href: '/categories' },
              { label: "Today's Deals", href: '/deals' },
              { label: 'Contact Us', href: '/contact' },
            ].map((dest) => (
              <Link
                key={dest.label}
                href={dest.href}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  dest.active 
                    ? "bg-green-50 text-green-700 hover:bg-green-100" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dest.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
