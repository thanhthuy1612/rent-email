import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contact, policy } from "@/constants/landing";
import { Link } from "@/i18n/navigation";
import PolicyContract from "@/components-page/landing/components/PolicyContact";
import React from "react";

export interface IPolicy {
  ref: React.Ref<HTMLDivElement> | undefined;
}

const Policy: React.FC<IPolicy> = ({ ref }) => {
  return (
    <div ref={ref}>
      <div className="my-20">
        <p className="px-8 md:px-0 text-[#181c32] mb-4 text-center text-[2.5rem] font-bold">
          Chính sách hoa hồng
        </p>
        <div className="px-8 md:px-0 flex justify-center">
          <p className="text-[#a1a5b7] text-center w-full max-w-md">
            CHOTP chia sẻ doanh thu qua kênh Affliate cho các MMOers kênh đại lý
            bán hàng, kênh đại lý với phần trăm cao, lợi nhuận trả hàng tuần Chi
            tiết liên hệ CSKH của CHOTP.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="z-0 absolute bottom-0 text-landing w-[100%]">
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
        </div>
        <div className="flex justify-center px-8 md:px-0">
          <Card className="bg-gradient-to-r p-10 from-[#20AA3E] to-[#03A588] !z-1 w-full max-w-[1190px]">
            <CardContent>
              <div className="flex gap-8 justify-center md:justify-between items-center flex-wrap">
                <div>
                  <p className="text-white text-[2.25rem] mb-2">
                    CHOTP - Cho thuê Email
                  </p>
                  <p className="text-[#fff] text-[1.15rem]">
                    Hơn 200.000 người dùng mỗi ngày. Đăng Ký Ngay
                  </p>
                </div>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="bg-transparent text-white"
                    size="lg"
                  >
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-landing py-20 px-8 md:px-0 flex justify-center">
        <div className="w-full max-w-[1190px] flex flex-col md:flex-row gap-5 md:gap-0">
          <div className="flex flex-col gap-10 basis-full md:basis-[50%]">
            {policy.map((item) => (
              <PolicyContract
                key={item.title}
                title={item.title}
                link={item.link}
              />
            ))}
          </div>
          <div className="basis-full md:basis-[50%] flex items-center md:items-end flex-col text-white opacity-50">
            <p className="text-[#b5b5c3] text-[1.5rem] mb-6">Liên hệ</p>
            {contact.map((item) => (
              <Link
                key={item.title}
                className="hover:opacity-90 cursor-pointer text-[1.15rem] mb-6"
                href={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
