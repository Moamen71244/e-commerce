import { CategoryType, Subcategory } from "@/app/interfaces"


export async function getAllCategories(): Promise<CategoryType[] | null> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  return data.data
}

export async function getCategoryBySlug(slug: string): Promise<CategoryType | null> {
  const allCategories = await getAllCategories();
  if (!allCategories) return null;
  return allCategories.find((cat) => cat.slug === slug) || null;
}

export async function getSubcategoriesByCategory(categoryId: string): Promise<Subcategory[] | null> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  return data.data
}

export async function getAllSubcategories(): Promise<Subcategory[] | null> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
  if (!res.ok) return null
  const data = await res.json()
  return data.data
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  const allSubcategories = await getAllSubcategories()
  if (!allSubcategories) return null
  return allSubcategories.find((subcat) => subcat.slug === slug) || null
}