import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/logo-landing.webp";
import { Link } from "@/i18n/navigation";

const Footer: React.FC = () => {
  return (
    <div className="bg-landing flex justify-center py-8 border-t border-dashed border-[#2c3f5b]">
      <div className="w-full px-8 md:px-0 max-w-[1190px] flex items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="download-img"
            className="w-[100%] object-cover max-w-[20px]"
          />
        </Link>
        <p className="text-white opacity-50 ml-3">© 2021 ViOTP</p>
      </div>
    </div>
  );
};

export default Footer;
