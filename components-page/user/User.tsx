"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { useTranslations } from "use-intl";
import { useAppSelector } from "@/lib/hooks";
import { fNumber, getLocale, getPathName } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UserNav from "@/components-page/user/components/UserNav";
import UserInfo from "@/components-page/user/components/UserInfo";
import ChangePassword from "@/components-page/user/components/ChangePassword";
import { CircleDollarSignIcon, Clock } from "lucide-react";
import { dateFormat } from "@/lib/useTime";

// ----------------------------------------------------------------------

const User: React.FC = () => {
  const t = useTranslations();

  const user = useAppSelector((item) => item.user);
  const pathname = usePathname() ?? "";
  const local = getLocale(pathname);
  const currentPath = getPathName(pathname);

  const renderNavItem = () => {
    switch (currentPath) {
      case "/user":
        return <UserInfo />;
      case "/user/change-password":
        return <ChangePassword />;
    }
  };
  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 mx-5 mb-8 pb-0">
        <div className="flex">
          <div className="inline-block">
            <Image
              src="/avatar-default.webp"
              alt={t("user.avatarAlt")}
              width={160}
              height={160}
            />
          </div>
          <div className="px-4 gap-4 flex flex-col justify-between">
            <div className="font-bold">{user?.userName}</div>
            <div className="flex flex-wrap">
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6">
                <div className="flex gap-2 items-center mb-2">
                  <CircleDollarSignIcon className="size-4 text-yellow-500" />
                  <span className="font-bold">
                    {fNumber(user.balance ?? 0, local)} ₫
                  </span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.balance")}
                </div>
              </div>
              <div className="border hidden md:block border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4 text-red-500" />
                  <span className="font-bold">
                    {dateFormat(user.creationDate)}
                  </span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.lastRental")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserNav />
      </Card>
      {renderNavItem()}
    </div>
  );
};
export default User;
