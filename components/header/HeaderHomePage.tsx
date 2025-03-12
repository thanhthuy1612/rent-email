import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/logo-landing.webp";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { Link } from "@/i18n/navigation";

// ----------------------------------------------------------------------

const HeaderHomePage: React.FC = () => {
  return (
    <div className="bg-landing flex py-3 px-10 gap-10 justify-between">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="download-img"
          className="w-[100%] object-cover max-w-[50px]"
        />
      </Link>
      <div className="flex gap-5 items-center">
        <LocaleSwitcher />
        <Link href={"/login"}>
          <Button className=" cursor-pointer bg-emerald-500 hover:bg-emerald-600">
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button className=" cursor-pointer bg-purple-500 hover:bg-purple-600">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default HeaderHomePage;
