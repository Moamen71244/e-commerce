"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { product } from "@/app/interfaces";
import { getAllProducts } from "@/ApiServices/Products.services";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load products when input is focused for the first time
  const handleFocus = async () => {
    setIsOpen(true);
    if (products.length === 0 && !isLoading) {
      setIsLoading(true);
      try {
        const data = await getAllProducts(100);
        if (data) setProducts(data);
      } catch (error) {
        console.error("Failed to load products for search", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products based on query (checks title, category, and brand)
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(" ");
    
    return products.filter((p) => {
      const searchString = `
        ${p.title} 
        ${p.category?.name || ""} 
        ${p.brand?.name || ""}
      `.toLowerCase();
      
      // Every term in the query must be found in the combined search string
      return searchTerms.every(term => searchString.includes(term));
    }).slice(0, 6); // Limit to top 6 results
  }, [query, products]);

  const handleResultClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredProducts.length > 0) {
      router.push(`/productDetails/${filteredProducts[0]._id}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative w-full max-w-md hidden lg:block" ref={dropdownRef}>
      {/* Search Input Container */}
      <div className="flex border rounded-full items-center justify-between w-full p-1 focus-within:border-green-500 focus-within:shadow-xs focus-within:shadow-green-100 bg-white">
        <input
          ref={inputRef}
          type="text"
          className="ms-5 focus-within:outline-none w-full placeholder:text-sm placeholder:text-[#36415380] placeholder:font-medium text-sm text-gray-800 bg-transparent"
          placeholder="Search for products, brands and more..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        <span className="bg-[#16A34A] px-[9.25px] py-2.5 rounded-full flex items-center justify-center shrink-0">
          <Search size={16} className="text-white" strokeWidth={3} />
        </span>
      </div>

      {/* Floating Dropdown Results */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-[100] max-h-[400px] overflow-y-auto flex flex-col py-2">
          {isLoading ? (
            <div className="p-6 flex flex-col items-center justify-center text-gray-400 gap-2">
              <Loader2 className="animate-spin" size={24} />
              <p className="text-sm">Loading catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Search Results
              </div>
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/productDetails/${product._id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors group border-b border-gray-50 last:border-0"
                >
                  <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                    <img 
                      src={product.imageCover} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 truncate flex items-center gap-1.5">
                      <span className="text-green-600">{product.category?.name}</span>
                      {product.brand?.name && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>{product.brand.name}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-gray-900 shrink-0">
                    {product.price} EGP
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              <p>No results found for "<span className="font-semibold text-gray-900">{query}</span>"</p>
              <p className="text-xs mt-1">Try a different keyword, category, or brand.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
