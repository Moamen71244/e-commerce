import { getAllBrands } from "@/ApiServices/Brands.services";
import { ChevronRight, Home, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function BrandsPage() {
  const brands = await getAllBrands() || [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🟢 HERO SECTION: Solid Bright Green */}
      <div className="w-full bg-[#2ECC71] px-4 py-8 md:px-10 lg:px-20 text-white shadow-sm flex flex-col justify-end min-h-[160px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm mb-4 font-medium opacity-90 tracking-wide">
          <Link href="/" className="hover:text-green-50 transition">Home</Link>
          <span className="opacity-60">/</span>
          <span className="font-bold">Brands</span>
        </div>

        {/* Title Block */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-16 w-16 bg-white/20 rounded-2xl p-4 overflow-hidden shrink-0 shadow-sm border border-white/20 backdrop-blur-md">
             <LayoutGrid size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Our Brands
            </h1>
            <p className="text-sm md:text-base font-medium opacity-90 mt-1">
              Explore products from top requested partner brands
            </p>
          </div>
        </div>
      </div>

      {/* 📦 BRANDS GRID */}
      <main className="container mx-auto px-4 py-8 md:px-10 lg:px-20 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {brands.length} Premium Brands
          </h2>
        </div>

        {brands && brands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
             {brands.map((brand) => (
                <Link 
                  href={`/brands/${brand._id}`}
                  key={brand._id} 
                  className="group block bg-white border border-gray-100 rounded-3xl shadow-xs hover:shadow-xl hover:border-green-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full aspect-square bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-out"
                    />
                  </div>
                  <div className="p-4 text-center border-t border-gray-50">
                     <h3 className="font-bold text-gray-900 group-hover:text-[#2ECC71] transition-colors truncate">
                       {brand.name}
                     </h3>
                  </div>
                </Link>
             ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">No brands found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center px-4 text-sm max-w-md">
              We couldn't find any brands at the moment. Please check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
