import { getSpesificProduct, getProductsByCategory, getProductReviews } from "@/ApiServices/Products.services"

import { product } from "@/app/interfaces"
import Link from "next/link";
import ProductGallery from "@/app/_components/Product/ProductGallery";
import ProductActions from "@/app/_components/Product/ProductActions";
import ProductTabs from "@/app/_components/Product/ProductTabs";
import RelatedProductsCarousel from "@/app/_components/Product/RelatedProductsCarousel";
import { Star } from "lucide-react";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const productDetails = await getSpesificProduct(id);

  if (!productDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/" className="text-green-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const relatedProducts = await getProductsByCategory(productDetails.category._id);
  const filteredRelated = relatedProducts?.filter(p => p._id !== id) || [];
  
  const reviews = await getProductReviews(id);
  const reviewsCount = reviews?.length || 0;
  
  // Calculate average rating if there are reviews
  const avgRating = reviewsCount > 0 
    ? (reviews!.reduce((acc, curr) => acc + curr.rating, 0) / reviewsCount).toFixed(1)
    : "4.0"; // Default


  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-xs font-medium text-gray-500 sm:text-sm">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-green-600 transition flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Home
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li>
            <Link href={`/categories/${productDetails.category.slug}`} className="hover:text-green-600 transition">
              {productDetails.category.name}
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{productDetails.title}</li>
        </ol>
      </nav>

      {/* Main Top Section */}
      <div className="grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.2fr_1fr] gap-10 xl:gap-16 items-start">
        
        {/* Left: Interactive Image Gallery */}
        <ProductGallery images={productDetails.images} />

        {/* Right: Product Details & Actions */}
        <div className="flex flex-col gap-6">
          {/* Header info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold tracking-wide">
                {productDetails.category.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold tracking-wide">
                {productDetails.brand.name}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {productDetails.title}
            </h1>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded w-fit">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                 ))}
                 <span className="ml-1 text-xs font-bold text-yellow-700">{avgRating}</span>
               </div>
               <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-green-600">({reviewsCount} review{reviewsCount !== 1 ? 's' : ''})</span>
            </div>

          </div>

          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-gray-900">
                 {productDetails.price} EGP
              </span>
              {productDetails.priceAfterDiscount && (
                <span className="text-lg font-bold text-red-500 line-through mb-1">
                   {productDetails.price} EGP
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-600">In Stock</span>
            </div>
          </div>

          <hr className="border-gray-100" />
          
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
             {productDetails.description || "Material Polyester Blend Colour Name Multicolour Department Women"}
          </p>

          <hr className="border-gray-100" />

          {/* Interactive Pricing and Add to Cart */}
          <ProductActions 
            productId={productDetails._id} 
            price={productDetails.price} 
            available={productDetails.quantity || 220} 
          />
        </div>
      </div>

      {/* Tabs Section */}
      <ProductTabs productData={productDetails} reviews={reviews} />



      {/* Related Products Carousel */}
      <RelatedProductsCarousel products={filteredRelated} />
    </main>
  )
}