import { service } from "@/constants/landing";
import ServiceItem from "@/components-page/landing/components/ServiceItem";
import React from "react";

export interface IService {
  ref: React.Ref<HTMLDivElement> | undefined;
}
const Service: React.FC<IService> = ({ ref }) => {
  return (
    <div ref={ref}>
      <div className="bg-landing pt-30">
        <p className="px-10 md:px-0 text-[#fff] text-[2.5rem] text-center mb-4 font-bold">
          Cung cấp email
        </p>
        <p className="px-8 md:px-0 text-[#5e6278] text-[1.15rem] pb-28 text-center w-full">
          ViOTP có kho email tại nhiều quốc gia ở Châu Á, phục vụ 24/7, cấp API
          cho khách hàng có nhu cầu sử dụng lớn.
        </p>
        <div className="flex justify-center">
          <div className="grid w-full max-w-[1190px] px-10 grid-cols-1 md:grid-cols-3 gap-5 mb-[60px]">
            {service.map((item) => (
              <ServiceItem
                key={item.title}
                number={item.number}
                Icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
        </div>
        <p className="px-8 md:px-0 text-[#a1a5b7] text-[1.5rem] pb-28 text-center w-full">
          CHOTP - Cho thuê email
        </p>
        ạ
      </div>
      <div className="relative text-landing mb-10 mb-lg-20">
        <svg
          viewBox="15 12 1470 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Service;
