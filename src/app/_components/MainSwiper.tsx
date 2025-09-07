'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import Image from "next/image";
import { Autoplay } from 'swiper/modules';


export default function MainSwiper() {
  return (
    <>
      <div className="lg:flex hidden  mt-10">
        <div className=" w-3/4">
          <Swiper spaceBetween={0} slidesPerView={1}   
           autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
                        modules={[Autoplay]}
 >
            <SwiperSlide>
              <Image className=" w-full h-[400] object-cover"  src={slider1} alt=''/>
            </SwiperSlide>
            <SwiperSlide><Image className=" w-full h-[400] object-cover" src={slider2} alt=''/></SwiperSlide>
            <SwiperSlide><Image className=" w-full h-[400] object-cover" src={slider3} alt=''/></SwiperSlide>
          </Swiper>
        </div>
        <div className=" w-1/4">
          <Swiper spaceBetween={0} slidesPerView={3}>
           <Image className=" w-full h-[200] object-cover" src={blog1} alt=''/>
            <Image className=" w-full h-[200] object-cover" src={blog2} alt=''/>
          </Swiper>
        </div>
      </div>
    </>
  );
}
