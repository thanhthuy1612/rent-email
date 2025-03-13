"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useTransition } from "react";
import { useTranslations } from "use-intl";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { log } from "console";
// ----------------------------------------------------------------------
const User: React.FC = () => {
  const t = useTranslations();
  const [state, setState] = React.useState({
    fullname: "Fullname",
    name: "Username",
    email: "doquoctuan311@gmail.com",
    balance: 10,
    totalSubscriberCodes: 10,
    lastRental: dayjs().format("DD/MM/YYYY"),
    phoneNumber: "0xx123",
    token: "67438a33d33b4db7b20ab3b18232f3cb",
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.token);
      toast({ title: "Copy successful!" });
    } catch (err) {
      toast({ title: "Copy failed!", variant: "destructive" });
    }
  };
  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 mb-8">
        <div className="flex">
          <div className="inline-block">
            <Image
              src="/avatar-default.webp"
              alt="Test"
              width={160}
              height={160}
            />{" "}
          </div>
          <div className="px-4 gap-3 flex flex-col">
            <div className="font-bold">{state.name}</div>
            <div className="flex gap-2">
              <a>
                <span className="h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z"
                      fill="black"
                    ></path>
                    <path
                      d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z"
                      fill="black"
                    ></path>
                  </svg>
                </span>
              </a>
              <a>
                <span className="h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8c8c8c"
                    stroke-width="2"
                    stroke-linecap="butt"
                    stroke-linejoin="arcs"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
              </a>
              <a className="flex">
                <span className="h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                      fill="black"
                    ></path>
                    <path
                      d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                      fill="black"
                    ></path>
                  </svg>
                </span>
                <span className="ml-4">{state.email}</span>
              </a>
            </div>
            <div className="flex flex-wrap">
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex align-bottom">
                  {" "}
                  <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#D4AF37"
                      className="bi bi-coin"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                      ></path>
                    </svg>
                  </span>
                  <span className="font-bold">{`$${state.balance}`}</span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.balance")}
                </div>
              </div>
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex align-middle">
                  {" "}
                  <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#009EF7"
                      className="bi bi-sim"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1.5A1.5 1.5 0 0 1 3.5 0h7.086a1.5 1.5 0 0 1 1.06.44l1.915 1.914A1.5 1.5 0 0 1 14 3.414V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-13zM3.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V3.414a.5.5 0 0 0-.146-.353l-1.915-1.915A.5.5 0 0 0 10.586 1H3.5z"></path>
                      <path d="M5.5 4a.5.5 0 0 0-.5.5V6h2.5V4h-2zm3 0v2H11V4.5a.5.5 0 0 0-.5-.5h-2zM11 7H5v2h6V7zm0 3H8.5v2h2a.5.5 0 0 0 .5-.5V10zm-3.5 2v-2H5v1.5a.5.5 0 0 0 .5.5h2zM4 4.5A1.5 1.5 0 0 1 5.5 3h5A1.5 1.5 0 0 1 12 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 11.5v-7z"></path>
                    </svg>
                  </span>
                  <span className="font-bold">{`$${state.totalSubscriberCodes}`}</span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.totalSubscriberCodes")}
                </div>
              </div>
              <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div className="flex align-middle">
                  <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#F1416C"
                      className="bi bi-arrow-bar-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                      ></path>
                    </svg>
                  </span>
                  <span className="font-bold">{state.lastRental}</span>
                </div>
                <div className="text-[#a1a5b7] font-medium">
                  {t("user.lastRental")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-10">
        <div className="flex justify-between">
          <h3 className="font-bold">{t("user.accountInformation")}</h3>
          <div>
            <Button className="bg-[#009ef7]">
              {t("user.updateInformation")}
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid gap-4">
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.fullname")}</label>
            <div>
              <span>{state.fullname}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.username")}</label>
            <div>
              <span>{state.name}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.email")}</label>
            <div>
              <span>{state.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.phoneNumber")}</label>
            <div>
              <span>{state.phoneNumber}</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label className="text-[#a1a5b7]">{t("user.telegram")}</label>
            <div>
              <Button className="bg-[#009ef7]">
                {t("user.connectTelegram")}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex bg-[#f1faff] justify-between rounded-2xl p-5 border-dashed border-1 border-[#009ef7]">
              <div>
                <h4 className="font-bold">Token</h4>
                <div className="text-gray-700 text-sm">{state.token}</div>
              </div>
              <div>
                <Button className="bg-[#009ef7]" onClick={handleCopy}>
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
