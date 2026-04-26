import { getBrandById } from "@/ApiServices/Brands.services";
import { getProductsByBrand } from "@/ApiServices/Products.services";
import ProductCard from "@/app/_components/Products/ProductCard";
import { ChevronRight, Home, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BrandProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch Brand details by id
  const brand = await getBrandById(id);

  if (!brand) {
    notFound();
  }

  // 2. Fetch products for this brand
  const products = await getProductsByBrand(brand._id);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🟢 HEADER SECTION */}
      <div className="relative w-full bg-slate-900 border-b-4 border-slate-800">
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-white px-4 text-center py-12 md:py-16">
          <div className="flex items-center gap-2 mb-6 text-sm font-medium opacity-70 transition-all hover:opacity-100">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{brand.name}</span>
          </div>
          
          <div className="h-20 w-20 md:h-28 md:w-28 bg-white rounded-full p-2 overflow-hidden shadow-2xl border-4 border-white mb-6">
             <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-md text-white">
            {brand.name}
          </h1>
          <p className="text-base opacity-80 font-light max-w-lg">
             Shop the exclusive collection of authenticated {brand.name} items.
          </p>
        </div>
      </div>

      {/* 📦 PRODUCTS GRID */}
      <main className="container mx-auto px-4 py-12 lg:px-20 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Brand Collection</h2>
              <p className="text-sm text-gray-500">
                Found {products?.length || 0} products matching this brand
              </p>
            </div>
          </div>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
               <div className="py-2" key={product._id}>
                <ProductCard product={product} />
               </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 border border-gray-100">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center px-4">
              We couldn't find any specific inventory for {brand.name} at the moment.
            </p>
            <Link 
              href="/brands"
              className="px-6 py-2.5 font-bold bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm"
            >
              Browse Other Brands
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
