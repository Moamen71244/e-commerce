"use client";

import { useState } from "react";
import { product, Review } from "@/app/interfaces";
import { Check, Star, User } from "lucide-react";

export default function ProductTabs({ productData, reviews }: { productData: product, reviews: Review[] | null }) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "shipping">("details");
  const reviewsCount = reviews?.length || 0;

  return (
    <div className="w-full mt-16 border rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100 bg-gray-50/50 flex-wrap">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 min-w-[150px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === "details"
              ? "text-green-600 bg-white border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
          }`}
        >
          <div className={`w-3 h-3 rounded-sm ${activeTab === "details" ? "bg-green-600" : "bg-gray-300"}`} />
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 min-w-[150px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === "reviews"
              ? "text-gray-900 bg-white border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
          }`}
        >
           <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === "reviews" ? "text-gray-900" : "text-gray-400"}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          Reviews ({reviewsCount})
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`flex-1 min-w-[150px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === "shipping"
              ? "text-gray-900 bg-white border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === "shipping" ? "text-gray-900" : "text-gray-400"}><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          Shipping & Returns
        </button>
      </div>

      {/* Tabs Content */}
      <div className="p-8">
        {activeTab === "details" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* About this Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">About this Product</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {productData.description || "Material Polyester Blend Colour Name Multicolour Department Women"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Information */}
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Product Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold text-gray-900">{productData.category?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-semibold text-gray-900">{productData.brand?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Items Sold</span>
                    <span className="font-semibold text-gray-900">{productData.sold || 0}+ sold</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-500">Stock Status</span>
                    <span className="font-semibold text-green-600">{productData.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Key Features</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-gray-600">Premium Quality Product</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-gray-600">100% Authentic Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-gray-600">Fast & Secure Packaging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-gray-600">Quality Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 py-4">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Customer Reviews</h3>
            {reviewsCount === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-sm">No written reviews yet for this product. Be the first to review!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {reviews?.map((review) => (
                  <div key={review._id} className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <User size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-gray-900">{review.user.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{review.review}</p>
                      <p className="text-[10px] text-gray-400 mt-2 font-medium">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {activeTab === "shipping" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-bold text-gray-900">Shipping & Returns Information</h3>
            <div className="text-gray-600 text-sm space-y-2">
               <p><span className="font-semibold text-gray-900">Shipping Mode:</span> Standard Delivery or Express</p>
               <p><span className="font-semibold text-gray-900">Processing Time:</span> 1-2 Business Days</p>
               <p><span className="font-semibold text-gray-900">Return Policy:</span> 30 days hassle-free returns on all unmet expectations. Items must be in original condition.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
