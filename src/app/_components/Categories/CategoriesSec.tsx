import { getAllCategories } from "@/ApiServices/Categories.services";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import CustomHead from "../Navbar/CustomHead";

export default async function CategoriesSec() {

  const allCategories = await getAllCategories();
  

  return (
    <div className="py-8 mt-8 px-4 bg-gray-50/80">
        <CustomHead title="Shop By" coloredWord="Categories" linkTo="View ALl Categories"/>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
{
        allCategories?.map((cat)=>
        <Link href={`/categories/${cat.slug}`} key={cat._id} >
            <CategoryCard  cat={cat} />
        </Link>
        )
      }
</div>

    </div>
  )
}
