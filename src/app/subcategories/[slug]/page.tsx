import { getSubcategoryBySlug } from "@/ApiServices/Categories.services";
import { getProductsBySubcategory } from "@/ApiServices/Products.services";
import ProductCard from "@/app/_components/Products/ProductCard";
import { ChevronRight, Home, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch subcategory details by slug
  const subcategory = await getSubcategoryBySlug(slug);

  if (!subcategory) {
    notFound();
  }

  // 2. Fetch products for this subcategory
  const products = await getProductsBySubcategory(subcategory._id);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🟢 HEADER SECTION */}
      <div className="relative w-full bg-green-600 border-b-4 border-green-700">
        <div className="absolute inset-0 bg-linear-to-r from-green-700/80 to-green-500/40 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-white px-4 text-center py-16">
          <div className="flex items-center gap-2 mb-4 text-sm font-medium opacity-90 transition-all hover:opacity-100">
            <Link href="/" className="flex items-center gap-1 hover:text-green-200">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
             {/* Note: In a full strict hierarchy we would link back to the parent category, but subcategory doesn't return full mapped parent name here easily, so we route back safely */}
             <span className="text-green-200">{subcategory.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 drop-shadow-md">
            {subcategory.name}
          </h1>
          <p className="text-base opacity-90 font-light">
             Explore our latest products in {subcategory.name.toLowerCase()}
          </p>
        </div>
      </div>

      {/* 📦 PRODUCTS GRID */}
      <main className="container mx-auto px-4 py-12 lg:px-20 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Available Products</h2>
              <p className="text-sm text-gray-500">
                Found {products?.length || 0} products in this subcategory
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
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center px-4">
              We couldn't find any products in {subcategory.name} at the moment.
            </p>
            <Link 
              href="/"
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-sm"
            >
              Go Back Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
