"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { Link, useRouter } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axiosLocal from "@/api/axiosLocal";

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
  const { id } = useAppSelector((item) => item.user);

  const router = useRouter();
  const goToLogin = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    delete axiosLocal.defaults.headers.common.Authorization;
    router.push("/login");
  };

  const goToUser = () => {
    router.push("/user");
  };

  return (
    <div className={className}>
      <div
        className={`${colorWhite ? "bg-white border-b" : "bg-landing"} flex justify-center items-center`}
      >
        <div className=" w-full flex py-3 px-8 md:px-10 gap-10 justify-between items-center">
          <div className="flex gap-3 items-center">
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
            <Link
              href={"/"}
              className={`font-bold text-xl ${colorWhite ? "text-black" : "text-white"}`}
            >
              CH-OTP.TOP
            </Link>
          </div>
          <div className="hidden md:block">{navLanding}</div>
          <div className="flex gap-5 items-center">
            <div className="hidden md:block">
              <LocaleSwitcher colorWhite={colorWhite} />
            </div>
            {!id ? (
              <Link href={"/login"}>
                <Button className=" cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600">
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <Avatar className="rounded-sm w-10 h-10 cursor-pointer">
                <Popover>
                  <PopoverTrigger className="focus:outline-none">
                    <Avatar className="w-10 h-10 cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User Avatar"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-white rounded-lg shadow-lg p-2">
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        className="justify-start px-4 py-2 text-left"
                        onClick={goToUser}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start px-4 py-2 text-left !text-red-500 hover:bg-red-100"
                        onClick={goToLogin}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <AvatarFallback className="rounded-sm bg-nav-item-background-active text-nav-item-active">
                  VN
                </AvatarFallback>
              </Avatar>
            )}
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
