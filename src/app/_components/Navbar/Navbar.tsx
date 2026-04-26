"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cartContext } from "@/app/_context/CartDataProvider";
import SearchBar from "./SearchBar";
import { useEffect, useState, useContext } from "react";
import { getAllCategories } from "@/ApiServices/Categories.services";
import { CategoryType } from "@/app/interfaces";
import { useWishlist } from "@/app/_context/WishlistDataProvider";
import { Heart } from "lucide-react";



export default function Navbar() {
  const session = useSession();
  const isUserAuth = session.status === "authenticated";
  const userName = session.data?.user?.name;
  const router = useRouter();
  const {numOfCartData} = useContext(cartContext);
  const { wishlistIds } = useWishlist();

  const categories = [
    { _id: "6439d61c0049ad0b52b90051", name: "Music", slug: "music" },
    { _id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", slug: "men's-fashion" },
    { _id: "6439d58a0049ad0b52b9003f", name: "Women's Fashion", slug: "women's-fashion" },
    { _id: "6439d41c67d9aa4ca97064d5", name: "SuperMarket", slug: "supermarket" },
    { _id: "6439d40367d9aa4ca97064cc", name: "Baby & Toys", slug: "baby-and-toys" },
    { _id: "6439d3e067d9aa4ca97064c3", name: "Home", slug: "home" },
    { _id: "6439d3c867d9aa4ca97064ba", name: "Books", slug: "books" },
    { _id: "6439d30b67d9aa4ca97064b1", name: "Beauty & Health", slug: "beauty-and-health" },
    { _id: "6439d2f467d9aa4ca97064a8", name: "Mobiles", slug: "mobiles" },
    { _id: "6439d2d167d9aa4ca970649f", name: "Electronics", slug: "electronics" },
  ];



  async function handleLogOut() {
    await signOut();
    router.replace("/signin");
  }
  return (
    <>
      <div className="hidden  lg:flex justify-between border-b border-[#F3F4F6] px-4 py-2.5 text-sm ">
        <div className="flex items-center gap-6 font-medium">
          <span className="flex gap-2 items-center">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.5C0 0.672656 0.672656 0 1.5 0H8.25C9.07734 0 9.75 0.672656 9.75 1.5V2.25H10.9383C11.3367 2.25 11.7188 2.40703 12 2.68828L13.0617 3.75C13.343 4.03125 13.5 4.41328 13.5 4.81172V8.25C13.5 9.07734 12.8273 9.75 12 9.75H11.9227C11.6789 10.6148 10.882 11.25 9.9375 11.25C8.99297 11.25 8.19844 10.6148 7.95234 9.75H5.54766C5.30391 10.6148 4.50703 11.25 3.5625 11.25C2.61797 11.25 1.82344 10.6148 1.57734 9.75H1.5C0.672656 9.75 0 9.07734 0 8.25V1.5ZM12 6V4.81172L10.9383 3.75H9.75V6H12ZM4.5 9.1875C4.5 8.93886 4.40123 8.7004 4.22541 8.52459C4.0496 8.34877 3.81114 8.25 3.5625 8.25C3.31386 8.25 3.0754 8.34877 2.89959 8.52459C2.72377 8.7004 2.625 8.93886 2.625 9.1875C2.625 9.43614 2.72377 9.6746 2.89959 9.85041C3.0754 10.0262 3.31386 10.125 3.5625 10.125C3.81114 10.125 4.0496 10.0262 4.22541 9.85041C4.40123 9.6746 4.5 9.43614 4.5 9.1875ZM9.9375 10.125C10.1861 10.125 10.4246 10.0262 10.6004 9.85041C10.7762 9.6746 10.875 9.43614 10.875 9.1875C10.875 8.93886 10.7762 8.7004 10.6004 8.52459C10.4246 8.34877 10.1861 8.25 9.9375 8.25C9.68886 8.25 9.4504 8.34877 9.27459 8.52459C9.09877 8.7004 9 8.93886 9 9.1875C9 9.43614 9.09877 9.6746 9.27459 9.85041C9.4504 10.0262 9.68886 10.125 9.9375 10.125Z"
                fill="#16A34A"
              />
            </svg>
            <p className=" text-[#6A7282] font-medium text-xs">
              Free Shipping on Orders Over 500 EGP
            </p>
          </span>
          <span className="flex gap-2 items-center">
            <svg
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.03516 1.6125C9.21328 1.31016 9.53672 1.125 9.88594 1.125H9.9375C10.4555 1.125 10.875 1.54453 10.875 2.0625C10.875 2.58047 10.4555 3 9.9375 3H8.21953L9.03516 1.6125ZM5.96484 1.6125L6.78047 3H5.0625C4.54453 3 4.125 2.58047 4.125 2.0625C4.125 1.54453 4.54453 1.125 5.0625 1.125H5.11406C5.46328 1.125 5.78906 1.31016 5.96484 1.6125ZM8.06484 1.04297L7.5 2.00391L6.93516 1.04297C6.55547 0.396094 5.86172 0 5.11406 0H5.0625C3.92344 0 3 0.923438 3 2.0625C3 2.4 3.08203 2.71875 3.225 3H2.25C1.83516 3 1.5 3.33516 1.5 3.75V4.5C1.5 4.91484 1.83516 5.25 2.25 5.25H12.75C13.1648 5.25 13.5 4.91484 13.5 4.5V3.75C13.5 3.33516 13.1648 3 12.75 3H11.775C11.918 2.71875 12 2.4 12 2.0625C12 0.923438 11.0766 0 9.9375 0H9.88594C9.13828 0 8.44453 0.396094 8.06484 1.04063V1.04297ZM12.75 6.375H8.0625V11.25H11.25C12.0773 11.25 12.75 10.5773 12.75 9.75V6.375ZM6.9375 6.375H2.25V9.75C2.25 10.5773 2.92266 11.25 3.75 11.25H6.9375V6.375Z"
                fill="#16A34A"
              />
            </svg>
            <p className=" text-[#6A7282] ">New Arrivals Daily</p>
          </span>
        </div>

        <div className="flex items-center gap-4 font-medium">
          <span className="flex gap-2 items-center cursor-pointer group">
            <svg
              className="fill-[#6A7282] group-hover:fill-[#16A34A]! transition-colors duration-300"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.75288 0.586223C3.56773 0.143254 3.08491 -0.0911211 2.62554 0.0330976L2.49663 0.0682539C0.98257 0.480754 -0.31118 1.94794 0.0661635 3.73388C0.935695 7.83544 4.16304 11.0628 8.2646 11.9323C10.0529 12.312 11.5177 11.0159 11.9302 9.50185L11.9654 9.37294C12.0919 8.91122 11.8552 8.42841 11.4146 8.2456L9.13413 7.29638C8.74741 7.13466 8.29976 7.24716 8.03257 7.57294L7.12788 8.67919C5.48023 7.86122 4.15366 6.49247 3.39194 4.812L4.42788 3.96825C4.75366 3.70341 4.86382 3.25575 4.70444 2.86669L3.75288 0.586223Z" />
            </svg>

            <p className=" text-[#6A7282] group-hover:text-[#16A34A]! font-medium">
              +1 (800) 123-4567
            </p>
          </span>
          <span className="flex gap-2 items-center cursor-pointer group">
            <svg
              className="fill-[#6A7282] group-hover:fill-[#16A34A]! transition-colors duration-300"
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.93906 1.5C2.14453 1.5 1.5 2.14453 1.5 2.93906C1.5 2.96016 1.5 2.97891 1.50234 3H1.5V9C1.5 9.82734 2.17266 10.5 3 10.5H12C12.8273 10.5 13.5 9.82734 13.5 9V3H13.4977C13.4977 2.97891 13.5 2.96016 13.5 2.93906C13.5 2.14453 12.8555 1.5 12.0609 1.5H2.93906ZM12.375 4.50703V9C12.375 9.20625 12.2063 9.375 12 9.375H3C2.79375 9.375 2.625 9.20625 2.625 9V4.50703L6.25313 7.25859C6.98906 7.81875 8.00859 7.81875 8.74688 7.25859L12.375 4.50703ZM2.625 2.93906C2.625 2.76562 2.76562 2.625 2.93906 2.625H12.0609C12.2344 2.625 12.375 2.76562 12.375 2.93906C12.375 3.0375 12.3281 3.13125 12.2508 3.18984L8.06719 6.36328C7.73203 6.61641 7.26797 6.61641 6.93281 6.36328L2.74922 3.18984C2.67188 3.13125 2.625 3.0375 2.625 2.93906Z" />
            </svg>
            <p className=" text-[#6A7282] group-hover:text-[#16A34A]!">
              support@freshcart.com
            </p>
          </span>

          <span className=" mx-1">
            {" "}
            <svg
              width="1"
              height="16"
              viewBox="0 0 1 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="1" height="16" fill="#E5E7EB" />
            </svg>
          </span>

          <span className="flex gap-1.5 items-center cursor-pointer group">
            <svg
              className="fill-[#6A7282] group-hover:fill-[#16A34A]!"
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.625 3C5.625 2.50272 5.82254 2.02581 6.17417 1.67417C6.52581 1.32254 7.00272 1.125 7.5 1.125C7.99728 1.125 8.47419 1.32254 8.82583 1.67417C9.17746 2.02581 9.375 2.50272 9.375 3C9.375 3.49728 9.17746 3.97419 8.82583 4.32583C8.47419 4.67746 7.99728 4.875 7.5 4.875C7.00272 4.875 6.52581 4.67746 6.17417 4.32583C5.82254 3.97419 5.625 3.49728 5.625 3ZM10.5 3C10.5 2.20435 10.1839 1.44129 9.62132 0.87868C9.05871 0.316071 8.29565 0 7.5 0C6.70435 0 5.94129 0.316071 5.37868 0.87868C4.81607 1.44129 4.5 2.20435 4.5 3C4.5 3.79565 4.81607 4.55871 5.37868 5.12132C5.94129 5.68393 6.70435 6 7.5 6C8.29565 6 9.05871 5.68393 9.62132 5.12132C10.1839 4.55871 10.5 3.79565 10.5 3ZM3.375 11.25C3.375 9.59297 4.71797 8.25 6.375 8.25H8.625C10.282 8.25 11.625 9.59297 11.625 11.25V11.4375C11.625 11.7492 11.8758 12 12.1875 12C12.4992 12 12.75 11.7492 12.75 11.4375V11.25C12.75 8.97188 10.9031 7.125 8.625 7.125H6.375C4.09688 7.125 2.25 8.97188 2.25 11.25V11.4375C2.25 11.7492 2.50078 12 2.8125 12C3.12422 12 3.375 11.7492 3.375 11.4375V11.25Z" />
            </svg>
            {isUserAuth ? (
              <div className="flex items-center gap-4">
                <Link href={"/allorders"}>
                  <p className=" text-[#6A7282] group-hover:text-[#16A34A]! font-medium">
                    My Orders
                  </p>
                </Link>
                <Link href={"/"}>
                  <p className=" text-[#6A7282] group-hover:text-[#16A34A]! font-medium">
                    {userName}
                  </p>
                </Link>
              </div>
            ) : (
              <Link href={"/signin"}>
                <p className=" text-[#6A7282] group-hover:text-[#16A34A]! font-medium">
                  Sign In
                </p>
              </Link>
            )}
          </span>

          {isUserAuth ? (
            <span
              onClick={handleLogOut}
              className="flex gap-1.5 items-center cursor-pointer group ms-2"
            >
              <svg
                className="fill-[#6A7282] group-hover:fill-[#16A34A]!"
                width={15}
                height={12}
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.3359 6.39844C13.5562 6.17812 13.5562 5.82188 13.3359 5.60391L9.96094 2.22656C9.79922 2.06484 9.55781 2.01797 9.34687 2.10469C9.13594 2.19141 9 2.39766 9 2.625V4.5H6.375C5.75391 4.5 5.25 5.00391 5.25 5.625V6.375C5.25 6.99609 5.75391 7.5 6.375 7.5H9V9.375C9 9.60234 9.13594 9.80859 9.34687 9.89531C9.55781 9.98203 9.79922 9.93516 9.96094 9.77344L13.3359 6.39844ZM5.25 2.25C5.66484 2.25 6 1.91484 6 1.5C6 1.08516 5.66484 0.75 5.25 0.75H3.75C2.50781 0.75 1.5 1.75781 1.5 3V9C1.5 10.2422 2.50781 11.25 3.75 11.25H5.25C5.66484 11.25 6 10.9148 6 10.5C6 10.0852 5.66484 9.75 5.25 9.75H3.75C3.33516 9.75 3 9.41484 3 9V3C3 2.58516 3.33516 2.25 3.75 2.25H5.25Z" />
              </svg>
              <button onClick={handleLogOut} className=" text-[#6A7282] group-hover:text-[#16A34A]! font-medium">
                Log Out
              </button>
            </span>
          ) : (
            <span className="flex gap-1.5 items-center cursor-pointer group">
              <svg
                className="fill-[#6A7282] group-hover:fill-[#16A34A]!"
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.0625 2.8125C2.0625 2.06658 2.35882 1.35121 2.88626 0.823762C3.41371 0.296316 4.12908 0 4.875 0C5.62092 0 6.33629 0.296316 6.86374 0.823762C7.39118 1.35121 7.6875 2.06658 7.6875 2.8125C7.6875 3.55842 7.39118 4.27379 6.86374 4.80124C6.33629 5.32868 5.62092 5.625 4.875 5.625C4.12908 5.625 3.41371 5.32868 2.88626 4.80124C2.35882 4.27379 2.0625 3.55842 2.0625 2.8125ZM0 11.1164C0 8.80781 1.87031 6.9375 4.17891 6.9375H5.57109C7.87969 6.9375 9.75 8.80781 9.75 11.1164C9.75 11.5008 9.43828 11.8125 9.05391 11.8125H0.696094C0.311719 11.8125 0 11.5008 0 11.1164ZM11.625 2.0625C11.9367 2.0625 12.1875 2.31328 12.1875 2.625V3.75H13.3125C13.6242 3.75 13.875 4.00078 13.875 4.3125C13.875 4.62422 13.6242 4.875 13.3125 4.875H12.1875V6C12.1875 6.31172 11.9367 6.5625 11.625 6.5625C11.3133 6.5625 11.0625 6.31172 11.0625 6V4.875H9.9375C9.62578 4.875 9.375 4.62422 9.375 4.3125C9.375 4.00078 9.62578 3.75 9.9375 3.75H11.0625V2.625C11.0625 2.31328 11.3133 2.0625 11.625 2.0625Z" />
              </svg>{" "}
              <Link href={"/signup"}>
                <p className=" text-[#6A7282] group-hover:text-[#16A34A]!">
                  Sign up
                </p>
              </Link>
            </span>
          )}
        </div>
      </div>

      <nav className="px-4 py-2.5 flex justify-between items-center sticky  bg-white top-0 z-50  shadow-lg">
        <div className="container flex items-center justify-between gap-2 z-50 ">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold">
            <Logo />
          </Link>

          <SearchBar />
          {/* Desktop Menu */}
          <NavigationMenu className="md:gap-3.5 font-medium text-[16px] text-[#364153]">
            <NavigationMenuList className="flex gap-2 items-center">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-transparent hover:text-[#16A34A] hover:text-shadow-2xs shadow-[#16A34A] focus:bg-transparent"
                    asChild
                  >
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-transparent hover:text-[#16A34A] hover:text-shadow-2xs shadow-[#16A34A]"
                    asChild
                  >
                    <Link href="/shop">shop</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-transparent hover:text-[#16A34A] hover:text-shadow-2xs shadow-[#16A34A] cursor-pointer ">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-40 py-2">
                  
                      {categories.map((cat) => (
                        <li key={cat._id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/categories/${cat.slug}`}
                              className="block px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0fdf4]! hover:text-[#16A34A]! text-sm font-medium"
                            >
                              {cat.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>

                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="hover:bg-transparent hover:text-[#16A34A] hover:text-shadow-2xs shadow-[#16A34A]"
                    asChild
                  >
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              <NavigationMenuItem className="flex items-center pe-2 border-e-2 border-e-gray-400/30">
                <NavigationMenuLink
                  className="hover:bg-transparent hover:text-[#16A34A] hover:text-shadow-2xs shadow-[#16A34A]"
                  asChild
                >
                  <Link href="/x">
                    <svg
                      width={40}
                      height={40}
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={40} height={40} rx={20} fill="#F0FDF4" />
                      <path
                        d="M20 14C17.5312 14 15.4781 15.7906 15.0719 18.1469C15.3625 18.0531 15.675 18 16 18H16.5C17.3281 18 18 18.6719 18 19.5V22.5C18 23.3281 17.3281 24 16.5 24H16C14.3438 24 13 22.6562 13 21V19C13 15.1344 16.1344 12 20 12C23.8656 12 27 15.1344 27 19V24.2531C27 26.325 25.3188 28.0031 23.2469 28.0031L20.5 28H19.5C18.6719 28 18 27.3281 18 26.5C18 25.6719 18.6719 25 19.5 25H20.5C21.3281 25 22 25.6719 22 26.5H23.25C24.4937 26.5 25.5 25.4937 25.5 24.25V23.5969C25.0594 23.8531 24.5469 23.9969 24 23.9969H23.5C22.6719 23.9969 22 23.325 22 22.4969V19.4969C22 18.6687 22.6719 17.9969 23.5 17.9969H24C24.325 17.9969 24.6344 18.0469 24.9281 18.1438C24.5219 15.7906 22.4719 13.9969 20 13.9969V14Z"
                        fill="#16A34A"
                      />
                    </svg>
                  </Link>
                </NavigationMenuLink>
                <div className="text-xs flex flex-col border-[#6A7282]">
                  <span className="text-gray-400 ">Support</span>
                  <span>24/7Help</span>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="secondary"
                  size="icon-lg"
                  className="rounded-full "
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>{" "}
        <div className="flex justify-between">
  
         <Link href={"/wishlist"}>
          <div className="rounded-full group relative cursor-pointer hover:bg-gray-100 p-2">
            {!!wishlistIds.length && (
              <div className="absolute w-5 h-5 border-2 border-white top-0 right-0 p-1 bg-red-500 flex justify-center rounded-full items-center">
                <p className="text-[10px] text-white font-black">
                  {wishlistIds.length}
                </p>
              </div>
            )}
            <Heart className="w-6 h-6 text-[#6A7282] group-hover:text-red-500 transition-colors" />
          </div>
        </Link>

         <Link href={"/cart"}>
         <div 
          className="rounded-full group relative cursor-pointer hover:bg-gray-100">
           {
            !!numOfCartData &&  <div className="absolute w-5 h-5 border-2 border-white top-0 right-0 p-1 bg-[#16A34A]  flex justify-center rounded-full items-center">
            <p className="text-xs text-white font-medium">
              {numOfCartData}
            </p>
        </div>
           }
            <svg
              className="fill-[#6A7282]  hover:fill-[#16A34A]"
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.9375 9.375C10.418 9.375 10 9.79297 10 10.3125C10 10.832 10.418 11.25 10.9375 11.25H12.707C12.8594 11.25 12.9883 11.3594 13.0156 11.5078L15.0508 22.6914C15.293 24.0273 16.457 25 17.8164 25H27.8125C28.332 25 28.75 24.582 28.75 24.0625C28.75 23.543 28.332 23.125 27.8125 23.125H17.8164C17.3633 23.125 16.9766 22.8008 16.8945 22.3555L16.6953 21.25H28.5547C29.7578 21.25 30.7891 20.3945 31.0117 19.2109L32.2227 12.7305C32.3672 11.9609 31.7773 11.25 30.9922 11.25H14.8711L14.8555 11.1719C14.668 10.1328 13.7617 9.375 12.7031 9.375H10.9375ZM18.125 30C18.6223 30 19.0992 29.8025 19.4508 29.4508C19.8025 29.0992 20 28.6223 20 28.125C20 27.6277 19.8025 27.1508 19.4508 26.7992C19.0992 26.4475 18.6223 26.25 18.125 26.25C17.6277 26.25 17.1508 26.4475 16.7992 26.7992C16.4475 27.1508 16.25 27.6277 16.25 28.125C16.25 28.6223 16.4475 29.0992 16.7992 29.4508C17.1508 29.8025 17.6277 30 18.125 30ZM26.875 30C27.3723 30 27.8492 29.8025 28.2008 29.4508C28.5525 29.0992 28.75 28.6223 28.75 28.125C28.75 27.6277 28.5525 27.1508 28.2008 26.7992C27.8492 26.4475 27.3723 26.25 26.875 26.25C26.3777 26.25 25.9008 26.4475 25.5492 26.7992C25.1975 27.1508 25 27.6277 25 28.125C25 28.6223 25.1975 29.0992 25.5492 29.4508C25.9008 29.8025 26.3777 30 26.875 30Z" />
            </svg>
         </div>
        </Link>

          {isUserAuth ? (
            <span className="rounded-full cursor-pointer hover:bg-gray-100">
              <svg
                className="fill-[#6A7282] hover:fill-[#16A34A]"
                width="45"
                height="40"
                viewBox="0 0 45 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.125 26.25V16.25H31.875V26.25C31.875 26.5938 31.5938 26.875 31.25 26.875H23.75C23.75 25.1484 22.3516 23.75 20.625 23.75H18.125C16.3984 23.75 15 25.1484 15 26.875H13.75C13.4062 26.875 13.125 26.5938 13.125 26.25ZM13.75 11.25C12.3711 11.25 11.25 12.3711 11.25 13.75V26.25C11.25 27.6289 12.3711 28.75 13.75 28.75H31.25C32.6289 28.75 33.75 27.6289 33.75 26.25V13.75C33.75 12.3711 32.6289 11.25 31.25 11.25H13.75ZM19.375 22.1875C19.9552 22.1875 20.5116 21.957 20.9218 21.5468C21.332 21.1366 21.5625 20.5802 21.5625 20C21.5625 19.4198 21.332 18.8634 20.9218 18.4532C20.5116 18.043 19.9552 17.8125 19.375 17.8125C18.7948 17.8125 18.2384 18.043 17.8282 18.4532C17.418 18.8634 17.1875 19.4198 17.1875 20C17.1875 20.5802 17.418 21.1366 17.8282 21.5468C18.2384 21.957 18.7948 22.1875 19.375 22.1875ZM25.9375 18.125C25.418 18.125 25 18.543 25 19.0625C25 19.582 25.418 20 25.9375 20H29.0625C29.582 20 30 19.582 30 19.0625C30 18.543 29.582 18.125 29.0625 18.125H25.9375ZM25.9375 21.875C25.418 21.875 25 22.293 25 22.8125C25 23.332 25.418 23.75 25.9375 23.75H29.0625C29.582 23.75 30 23.332 30 22.8125C30 22.293 29.582 21.875 29.0625 21.875H25.9375Z" />
              </svg>
            </span>
          ) : (
            <button className=" cursor-pointer w-25 py-2.5  transition deuration-300  rounded-2xl bg-[#16A34A]  shadow shadow-[#16A34A33]   hover:bg-green-700 text-sm font-semibold flex justify-center gap-2 items-center text-white">
              <svg
                className="fill-white"
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.625 3C5.625 2.50272 5.82254 2.02581 6.17417 1.67417C6.52581 1.32254 7.00272 1.125 7.5 1.125C7.99728 1.125 8.47419 1.32254 8.82583 1.67417C9.17746 2.02581 9.375 2.50272 9.375 3C9.375 3.49728 9.17746 3.97419 8.82583 4.32583C8.47419 4.67746 7.99728 4.875 7.5 4.875C7.00272 4.875 6.52581 4.67746 6.17417 4.32583C5.82254 3.97419 5.625 3.49728 5.625 3ZM10.5 3C10.5 2.20435 10.1839 1.44129 9.62132 0.87868C9.05871 0.316071 8.29565 0 7.5 0C6.70435 0 5.94129 0.316071 5.37868 0.87868C4.81607 1.44129 4.5 2.20435 4.5 3C4.5 3.79565 4.81607 4.55871 5.37868 5.12132C5.94129 5.68393 6.70435 6 7.5 6C8.29565 6 9.05871 5.68393 9.62132 5.12132C10.1839 4.55871 10.5 3.79565 10.5 3ZM3.375 11.25C3.375 9.59297 4.71797 8.25 6.375 8.25H8.625C10.282 8.25 11.625 9.59297 11.625 11.25V11.4375C11.625 11.7492 11.8758 12 12.1875 12C12.4992 12 12.75 11.7492 12.75 11.4375V11.25C12.75 8.97188 10.9031 7.125 8.625 7.125H6.375C4.09688 7.125 2.25 8.97188 2.25 11.25V11.4375C2.25 11.7492 2.50078 12 2.8125 12C3.12422 12 3.375 11.7492 3.375 11.4375V11.25Z" />
              </svg>
              <p>Sign In</p>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
