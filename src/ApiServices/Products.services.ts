import { product, Review } from "@/app/interfaces"


 export async function getAllProducts(limit?: number):Promise<product[] | null>{
    const url = limit 
      ? `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`
      : "https://ecommerce.routemisr.com/api/v1/products";
      
    const res = await fetch(url)
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data
  }

 export async function getSpesificProduct(id:string): Promise<product | null> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    if (!res.ok) return null

    const data = await res.json()
    return data.data
  }

  export async function getProductsByCategory(categoryId:string): Promise<product[] | null> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  }

  export async function getProductReviews(id: string): Promise<Review[] | null> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`)
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  }

  export async function getProductsBySubcategory(subcategoryId: string): Promise<product[] | null> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subcategoryId}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  }

  export async function getProductsByBrand(brandId: string): Promise<product[] | null> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  }
  