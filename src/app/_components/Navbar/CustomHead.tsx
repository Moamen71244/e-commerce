import Link from "next/link";
type CustomHead = {title:string,linkTo:string, coloredWord?:string | undefined }
export default function CustomHead({title,linkTo,coloredWord=undefined}:CustomHead) {
  return (
    <div className="header p-4 my-10 flex justify-between ">
    <span className="text-3xl  relative before:content-[''] leading-9 ps-5 font-bold before:bg-[#00BC7D] before:rounded-full before:h-full before:w-2 before:absolute before:top-0 before:left-0">{title}<span className="text-[#009966]"> {coloredWord}</span></span>
 {
    linkTo &&    <Link href={"/"} >
    {linkTo}
    </Link>
 }
 </div>
  )
}
