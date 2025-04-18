"use client";

import { introduce } from "@/constants/landing";
import IntroduceItem from "@/components-page/landing/components/IntroduceItem";
import React from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import img1 from "@/public/imgs/1.webp";
import img2 from "@/public/imgs/2.png";
import img3 from "@/public/imgs/3.png";
import Image from "next/image";

export interface IIntroduce {
  ref: React.Ref<HTMLDivElement> | undefined;
}

const Introduce: React.FC<IIntroduce> = ({ ref }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const listImg = [img1, img2, img3];

  return (
    <div ref={ref} className="relative">
      {/* <div className="absolute bottom-0 text-landing w-[100%]">
        <svg
          viewBox="15 -1 1470 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 48C4.93573 47.6644 8.85984 47.3311 12.7725 47H1489.16C1493.1 47.3311 1497.04 47.6644 1501 48V47H1489.16C914.668 -1.34764 587.282 -1.61174 12.7725 47H1V48Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="pb-10 lg:pb-15 bg-landing"></div>
      </div> */}
      <div className="flex justify-center">
        <div className="pt-11 px-8 w-full max-w-[1190px]">
          <h1 className="text-center text-[#181c32] text-[2.5rem] mb-3 font-bold">
            Email bạn cần - CH-OTP có
          </h1>
          <p className="text-center mb-20 text-[#a1a5b7] text-[1.15rem]">
            Thuê mail nhanh - Xài nhanh - Không chờ đợi
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[60px]">
            {introduce.map((item) => (
              <IntroduceItem
                key={item.id}
                index={item.id}
                img={item.img}
                title={item.title}
                description={item.description}
                className="flex flex-col items-center"
              />
            ))}
          </div>
          {/* <div className="px-10 flex justify-center pt-10">
            <Carousel
              plugins={[plugin.current]}
              className="w-full h-[500px]"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {listImg.map((item, index) => (
                  <CarouselItem key={index}>
                    <Card className="w-full h-[500px]">
                      <CardContent className="flex h-[100%] items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          <Image alt="img" src={item} />
                        </span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Introduce;
