// Import Swiper React components
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function ImagesSwipper({ slidesPerView = 1 ,spaceBetween = 50,className= "h-100"}:{slidesPerView? :number ,spaceBetween? :number, className?:string}){
  return (
    <Swiper
    loop
    modules={[Navigation, Pagination]}
    navigation
    pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} bg-white! w-3! h-3!"></span>`
        },
        bulletActiveClass:"w-7! bg-white! opacity-100! rounded-full! swiper-pagination-bullet-active"
      }}
    className={className}
      spaceBetween={50}
      slidesPerView={1}
    >
  
         <SwiperSlide >
            <div className="relative bg-green-50 z-50 h-100">
            <div className="absolute inset-0 bg-[url('https://freshcart-route.vercel.app/_next/static/media/home-slider-1.d79601a8.png')] bg-green-50 bg-center bg-cover">
            </div>
            </div>
            <div className="absolute inset-0  bg-linear-to-r to-[#05DF7280] from-[#00C950E5] z-50 flex flex-col justify-center gap-5 px-10">
            <h2 className="font-bold text-3xl leading-9 text-white">Fresh Products Delivered <br />
            to your Door</h2>
            <p className='leading-6 text-lg text-white font-medium'>Get 20% off your first order</p>
            <div className="flex gap-5">
            <Link href="/shop"><Button className='bg-white cursor-pointer text-[#00C950E5] border-2 border-white/50 hover:scale-110 duration-300 px-6 py-5 hover:bg-white text-[16px] font-semibold' >Shop Now</Button></Link>
            <Link href="/cart"><Button className='border-2  cursor-pointer border-white/50  text-white hover:scale-110 duration-300 bg-transparent hover:bg-transparent px-6 py-5 text-[16px] font-semibold' >View Cart</Button></Link>
              </div>
            </div>
      </SwiperSlide>
         <SwiperSlide >
            <div className="relative bg-green-50 z-50 h-100">
            <div className="absolute inset-0 bg-[url('https://freshcart-route.vercel.app/_next/static/media/home-slider-1.d79601a8.png')] bg-green-50 bg-center bg-cover">
            </div>
            </div>
            <div className="absolute inset-0  bg-linear-to-r to-[#05DF7280] from-[#00C950E5] z-50 flex flex-col justify-center gap-5 px-10">
            <h2 className="font-bold text-3xl leading-9 text-white ">Premium Quality Guaranteed<br />
            to your Door</h2>
            <p className='leading-6 text-lg text-white font-medium'>Fresh from farm to your table</p>
            <div className="flex gap-5">
<Link href="/shop"><Button className='bg-white border-2 border-white/50 hover:scale-110 duration-300 px-6 py-5 hover:bg-white text-[16px] font-semibold btn text-blue-500' >Shop Now</Button></Link>            
<Link href="/about"><Button className='border-2 border-white/50  text-white hover:scale-110 duration-300 bg-transparent hover:bg-transparent px-6 py-5 text-[16px] font-semibold' >Learn More</Button>
</Link>
            </div>
            </div>
      </SwiperSlide>
         <SwiperSlide >
            <div className="relative bg-green-50 z-50 h-100">
            <div className="absolute inset-0 bg-[url('https://freshcart-route.vercel.app/_next/static/media/home-slider-1.d79601a8.png')] bg-green-50 bg-center bg-cover">
            </div>
            </div>
            <div className="absolute inset-0  bg-linear-to-r to-[#05DF7280] from-[#00C950E5] z-50 flex flex-col justify-center gap-5 px-10">
            <h2 className="font-bold text-3xl leading-9 text-white">Fast & Free Delivery<br />
            to your Door</h2>
            <p className='leading-6 text-lg text-white font-medium'>Same day delivery available</p>
            <div className="flex gap-5">
            <Button className='bg-white border-2 border-white/50 hover:scale-110 duration-300 px-6 py-5 hover:bg-white text-[16px] font-semibold btn text-purple-500' >Order Now</Button>
            <Button className='border-2 border-white/50  text-white hover:scale-110 duration-300 bg-transparent hover:bg-transparent px-6 py-5 text-[16px] font-semibold' >Delivery Info</Button>
            </div>
            </div>
      </SwiperSlide>
 
   
     
     
    </Swiper>
  );
};