import { getCategoryBySlug, getSubcategoriesByCategory } from "@/ApiServices/Categories.services";
import { Folder, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch category details by slug
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // 2. Fetch subcategories for this category
  const subcategories = await getSubcategoriesByCategory(category._id) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* 🟢 HERO SECTION: Solid Bright Green */}
      <div className="w-full bg-[#2ECC71] px-4 py-8 md:px-10 lg:px-20 text-white shadow-sm flex flex-col justify-end min-h-[160px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm mb-4 font-medium opacity-90 tracking-wide">
          <Link href="/" className="hover:text-green-50 transition">Home</Link>
          <span className="opacity-60">/</span>
          <span className="opacity-60">Categories</span>
          <span className="opacity-60">/</span>
          <span className="font-bold">{category.name}</span>
        </div>

        {/* Title Block */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-16 w-16 bg-white rounded-2xl p-1 overflow-hidden shrink-0 shadow-sm border border-green-400">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm md:text-base font-medium opacity-90 mt-1">
              Choose a subcategory to browse products
            </p>
          </div>
        </div>
      </div>

      {/* 📦 SUBCATEGORIES GRID */}
      <main className="container mx-auto px-4 py-8 md:px-10 lg:px-20 max-w-7xl">
        
        {/* Top Controls */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition group mb-6">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>
          
          <h2 className="text-lg font-bold text-gray-900">
            {subcategories.length} Subcategories in {category.name}
          </h2>
        </div>

        {subcategories && subcategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
             {subcategories.map((sub) => (
                <Link 
                  href={`/subcategories/${sub.slug}`}
                  key={sub._id} 
                  className="group block p-6 bg-white border border-gray-100 rounded-3xl shadow-xs hover:shadow-lg hover:border-green-100 transition-all duration-300"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-[#2ECC71]/10 text-[#2ECC71] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2ECC71] group-hover:text-white transition-all">
                    <Folder size={20} className="fill-current" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                    {sub.name}
                  </h3>
                </Link>
             ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-300 border border-gray-100 shadow-sm">
              <Folder size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No subcategories found</h3>
            <p className="text-gray-500 mt-1 mb-6 text-center px-4 text-sm max-w-md">
              We couldn't find any subcategories under {category.name} at the moment. Please check back later.
            </p>
            <Link 
              href="/"
              className="px-6 py-2.5 font-bold bg-[#2ECC71] text-white rounded-full hover:bg-green-600 transition-colors shadow-sm"
            >
              Return Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
