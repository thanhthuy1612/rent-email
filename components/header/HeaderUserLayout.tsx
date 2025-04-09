"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { navData } from "@/layout/user/nav-data";
import { useAppSelector } from "@/lib/hooks";
import { fNumber, getLocale, getPathName } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import React from "react";
import MobileDrawer from "@/components/header/MobileDrawer";
import axiosLocal from "@/api/axiosLocal";

// ----------------------------------------------------------------------

const HeaderUserLayout: React.FC = () => {
  const [breadcrumb, setBreadcrumb] = React.useState<string[]>([]);
  const { push } = useRouter();

  const pathname = usePathname() ?? "";
  const local = getLocale(pathname);
  const t = useTranslations();

  const { balance } = useAppSelector((item) => item.user);
  const { scopes } = useAppSelector((item) => item.user);

  const getBreadcrumb = () => {
    const paths = getPathName(pathname);
    const navs =
      scopes === "admin"
        ? navData
        : navData.filter((item) => item.label !== "Quản lý");
    const findUrl = navs.reduce((resultNav: string[], nav) => {
      return nav.children.reduce((result: string[], item) => {
        if (paths.includes(item.url)) {
          return [nav.label, item.title];
        }
        return result;
      }, resultNav);
    }, []);

    setBreadcrumb(findUrl);
  };

  React.useEffect(() => {
    getBreadcrumb();
  }, [pathname]);

  const goToLogin = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    delete axiosLocal.defaults.headers.common.Authorization;
    push("/login");
  };

  const goToUser = () => {
    push("/user");
  };
  return (
    <>
      <div className="flex justify-between flex-wrap border-b md:justify-end items-center gap-5 py-3 px-5">
        <MobileDrawer />
        <div className="flex justify-end gap-5 items-center">
          <p className="text-layout-user-amount">
            {fNumber(balance ?? 0, local)} ₫
          </p>
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
        </div>
      </div>
      <div className="flex justify-between gap-5 py-3 border-b items-center px-5">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem key={item}>
                {index === breadcrumb.length - 1 ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>{item}</BreadcrumbLink>
                )}
                {index !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Link href="/recharge">
          <Button className="button-color ">{t("recharge.title")}</Button>
        </Link>
      </div>
    </>
  );
};
export default HeaderUserLayout;
