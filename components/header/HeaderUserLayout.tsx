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
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";

// ----------------------------------------------------------------------

const HeaderUserLayout: React.FC = () => {
  const [breadcrumb, setBreadcrumb] = React.useState<string[]>([]);

  const pathname = usePathname() ?? "";
  const local = getLocale(pathname);
  const t = useTranslations();

  const { balance } = useAppSelector((item) => item.user);

  const getBreadcrumb = () => {
    const paths = getPathName(pathname);
    const findUrl = navData.reduce((resultNav: string[], nav) => {
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

  return (
    <div>
      <div className="flex justify-end gap-5 py-3 border-b items-center px-10">
        <p className="text-layout-user-amount">
          {fNumber(balance ?? 0, local)} ₫
        </p>
        <Avatar className="rounded-sm w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="rounded-sm bg-nav-item-background-active text-nav-item-active">
            VN
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex justify-between gap-5 py-3 border-b items-center px-10">
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
          <Button className="bg-sky-500 hover:bg-sky-600 cursor-pointer">
            {t("recharge.title")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default HeaderUserLayout;
