import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import React from "react";

// ----------------------------------------------------------------------
export interface IHome {
  ref: React.Ref<HTMLDivElement> | undefined;
}

const Home: React.FC<IHome> = ({ ref }) => {
  return (
    <div ref={ref}>
      <div
        className="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom bg-landing"
        style={{ backgroundImage: "url('/imgs/landing.svg')" }}
      >
        <div className="flex flex-column justify-center items-center min-h-[350px] lg:min-h-[500px] px-9">
          <div className="text-center mb-5 mb-lg-10 py-10 py-lg-20">
            <h1 className="text-white text-2xl lg:text-5xl leading-8 lg:leading-14 font-bold mb-15">
              Dịch vụ cho thuê sim OTP
              <br></br>với
              <span
                style={{
                  background:
                    "linear-gradient(to right, #12CE5D 0%, #FFD80C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block", // Đảm bảo span hiển thị đúng
                }}
              >
                <span
                  id="kt_landing_hero_text"
                  className="text-2xl lg:text-5xl font-bold"
                >
                  Kho sim khủng nhất châu Á
                </span>
              </span>
            </h1>
            <Link href="/rent">
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
              >
                Thuê Ngay
              </Button>
            </Link>
          </div>
        </div>
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
export default Home;
