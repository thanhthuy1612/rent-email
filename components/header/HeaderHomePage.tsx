"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/logo.png";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// ----------------------------------------------------------------------
export interface IHeaderHomePage {
  navLanding?: React.JSX.Element;
  navSheet?: React.JSX.Element;
  colorWhite?: boolean;
  showSheet: boolean;
  setShowSheet: (item: boolean) => void;
  className: string;
}

const HeaderHomePage: React.FC<IHeaderHomePage> = ({
  navLanding,
  navSheet,
  colorWhite,
  showSheet,
  setShowSheet,
  className,
}) => {
  return (
    <div className={className}>
      <div
        className={`${colorWhite ? "bg-white border-b" : "bg-landing"} flex justify-center items-center`}
      >
        <div className=" w-full flex py-3 px-8 md:px-10 gap-10 justify-between items-center">
          <div className="flex gap-5 items-center">
            <div className="block md:hidden">
              <Sheet onOpenChange={setShowSheet} open={showSheet}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className={`!bg-transparent ${colorWhite ? "text-black opacity-80" : "text-white"}`}
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  {navSheet}
                  <SheetFooter>
                    <LocaleSwitcher colorWhite={true} />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <Link href={"/"}>
              <Image
                src={logo}
                alt="download-img"
                className="w-[100%] object-cover max-w-[30px]"
              />
            </Link>
          </div>
          <div className="hidden md:block">{navLanding}</div>
          <div className="flex gap-5 items-center">
            <div className="hidden md:block">
              <LocaleSwitcher colorWhite={colorWhite} />
            </div>
            <Link href={"/login"}>
              <Button className=" cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600">
                Login
              </Button>
            </Link>
            {/* <Link href={"/register"}>
            <Button className=" cursor-pointer bg-purple-500 hover:bg-purple-600">
              Register
            </Button>
          </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderHomePage;
