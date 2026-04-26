import { Brand } from "@/app/interfaces";

export async function getAllBrands(): Promise<Brand[] | null> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function getBrandById(id: string): Promise<Brand | null> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}
