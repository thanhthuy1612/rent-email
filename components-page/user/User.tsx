"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";
import IconUser from "@/components-page/user/IconUser";
import IconEmail from "@/components-page/user/IconEmail";
import IconBalance from "@/components-page/user/IconBalance";
import IconDate from "@/components-page/user/IconDate";
import IconCall from "@/components-page/user/IconCall";
import IconSim from "@/components-page/user/IconSim";
import { fNumber, getLocale } from "@/lib/utils";
import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------

const User: React.FC = () => {
  const t = useTranslations();

  const user = useAppSelector((item) => item.user);
  const pathname = usePathname() ?? "";
  const local = getLocale(pathname);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.apiToken ?? "");
      toast({ title: "Copy successful!" });
    } catch (err) {
      toast({ title: "Copy failed!", variant: "destructive" });
    }
  };
  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 mx-5 mb-8">
        <div className="flex">
          <div className="inline-block">
            <Image
              src="/avatar-default.webp"
              alt="Test"
              width={160}
              height={160}
            />
          </div>
          <div className="px-4 gap-4 flex flex-col">
            <div className="font-bold">{user?.userName}</div>
            <div className="flex gap-3">
              <a>
                <IconUser />
              </a>
              <a>
                <IconCall />
              </a>
              <a className="flex">
                <IconEmail />
                {/* <span className="ml-4">{state.email}</span> */}
              </a>
            </div>
            <div className="flex flex-wrap">
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex items-center mb-2">
                  <IconBalance />
                  <span className="font-bold">
                    {fNumber(user.balance ?? 0, local)} ₫
                  </span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.balance")}
                </div>
              </div>
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex items-center mb-2">
                  <IconSim />
                  <span className="font-bold">{`$${user.scopes}`}</span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.totalSubscriberCodes")}
                </div>
              </div>
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex items-center mb-2">
                  <IconDate />
                  <span className="font-bold">123</span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.lastRental")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-10 mx-5">
        <div className="flex justify-between">
          <h3 className="font-bold">{t("user.accountInformation")}</h3>
          <div>
            <Button className="bg-sky-500 hover:bg-sky-600">
              {t("user.updateInformation")}
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid gap-4">
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.fullname")}</label>
            <div>
              <span>{user.userName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.username")}</label>
            <div>
              <span>{user.userName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.email")}</label>
            <div>
              <span>{user.userName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.phoneNumber")}</label>
            <div>
              <span>{user.userName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.telegram")}</label>
            <div>
              <Button className="bg-sky-500 hover:bg-sky-600">
                {t("user.connectTelegram")}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex bg-[#f1faff] justify-between rounded-2xl p-5 border-dashed border-1 border-[#009ef7]">
              <div>
                <h4 className="font-bold">Token</h4>
                <div className="text-gray-700 text-sm"></div>
              </div>
              <div>
                <Button
                  className="bg-sky-500 hover:bg-sky-600"
                  onClick={handleCopy}
                >
                  {t("user.copy")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default User;
