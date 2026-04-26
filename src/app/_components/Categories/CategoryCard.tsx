import { CategoryType } from "@/app/interfaces";

export default function CategoryCard({cat}:{cat:CategoryType}) {
  return (
    <div className="flex flex-col gap-4 items-center p-4 bg-white border border-gray-100  hover:shadow-lg hover:shadow-gray-200 rounded-lg transition duration-150 ">
        <div className="img w-20 h-20 overflow-hidden rounded-full">
            <img src={cat.image} className="object-cover w-full h-full font-medium"  alt={cat.name} />
        </div>
        <h3>{cat.name}</h3>
    </div>
  )
}
