"use client"; 
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { product } from "../../interfaces"
import HeartIcon from "../Navbar/HeartIcon"
import AddToCartButton from "../AddToCartButton/AddToCartButton"
import {  EyeIcon, Repeat, Heart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/app/_context/WishlistDataProvider"

export default function CardImage({ product }: { product: product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product._id);

  return (
    <Card className="group relative mx-auto w-full max-w-sm pt-0 h-90 overflow-hidden rounded-xl  bg-white shadow-sm transition hover:shadow-2xl">
      <div className="relative h-80 overflow-hidde">
        <div className="absolute right-2 top-2 z-40 flex flex-col gap-2">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border cursor-pointer group/heart"
            onClick={() => toggleWishlist(product._id)}
          >
            <Heart 
              size={18} 
              className={`transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/heart:text-red-400"}`} 
            />
          </button>

          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border">
            <Repeat size={16} />
          </div>

          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border p-0">
            <Link href={`/productDetails/${product._id}`} className="flex items-center justify-center w-full h-full">
              <EyeIcon size={16}/>
            </Link>
          </div>
        </div>

        {product.priceAfterDiscount && (
          <Badge className="absolute left-3 top-3 z-40 py-1 bg-red-600 text-white">
             
            {
              `- ${Math.ceil(100  -  (100 * (product.priceAfterDiscount / product.price)))} %`
            }
          </Badge>
        )}
       <div className="text-center max-h-75 max-w-fit mx-auto">
       <img
          src={product.imageCover}
          alt={product.title}
          width={170}
          // height={400}
        />
       </div>
      </div>

      <div className="px-5">
        <CardHeader className="p-0 space-y-1">
          <CardTitle className="text-sm font-semibold leading-tight">
            {product.title.split(" ", 3).join(" ")}
          </CardTitle>

          <CardDescription className="text-xs text-muted-foreground">
            {product.description.split(" ", 1).join(" ")}
          </CardDescription>
        </CardHeader>

        <CardFooter className=" flex items-center justify-between p-0">
          {product.priceAfterDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-md font-bold text-green-600">
                ${product.priceAfterDiscount}
              </span>

              <span className="text-sm text-muted-foreground line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-md font-bold">${product.price}</span>
          )}

          <AddToCartButton id={product._id} className="bg-green-600 text-white hover:bg-green-700 rounded-full w-10 h-10 p-1" >+</AddToCartButton>
        </CardFooter>
      </div>
    </Card>
  )
}