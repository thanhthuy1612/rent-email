import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/logo-landing.webp";

// ----------------------------------------------------------------------

const HeaderHomePage: React.FC = () => {
  return (
    <div className="bg-landing">
      <Image
        src={logo}
        alt="download-img"
        className="w-[100%] object-cover max-w-[50px]"
      />
    </div>
  );
};
export default HeaderHomePage;
