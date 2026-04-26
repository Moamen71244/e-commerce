
import { Button } from "@/components/ui/button";
import { lazy, ReactNode, Suspense } from "react";
import ImagesSwipper from "./_components/Swipper/Swipper";
// import CategoriesSec from "./_components/Categories/CategoriesSec";
import ServicesSec from "./_components/Services/ServicesSec";
import loading from "./loading";
import Spinner from "./_components/Spinner/Spinner";
import ProductsSec from "./_components/Products/ProductsSec";
const LazyLoadedCategories  = lazy(  () => import("./_components/Categories/CategoriesSec")  )
export default async function Home(){
  return (
  <>
  <ImagesSwipper  className="h-100 w-full" />
  <ServicesSec/>
    <Suspense fallback={<div className="flex justify-center items-center h-40">
      <Spinner />
    </div>}>
    <LazyLoadedCategories />
    </Suspense>
    <ProductsSec/>
  </>
  );
}
