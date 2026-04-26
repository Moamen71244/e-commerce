import { getAllProducts } from '@/ApiServices/Products.services';
import Link from 'next/link';
import React from 'react'
import ProductCard from"./ProductCard"
import CustomHead from '../Navbar/CustomHead';
export default async function ProductsSec() {
    const allProducts = await getAllProducts();


  return (
    <>
        <CustomHead  title='Featured' coloredWord='Products' linkTo={""} /> 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5  sm:gap-1 md:gap-4 py-5 px-4 min-h-screen">
    {
      allProducts?.map((product)=><div key={product._id} className="grid-cols-1"><ProductCard  product={product}  /></div>)
    }
  </div>
    </>
  )
}
