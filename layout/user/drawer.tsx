"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/logo-landing.webp";
import logoColor from "@/public/imgs/logo.webp";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleDollarSign, Mail, User, Users } from "lucide-react";

export const navData = [
  {
    label: "Account",
    children: [
      { title: "Account Information", url: "/user", icon: User },
      { title: "Recharge", url: "/recharge", icon: CircleDollarSign },
    ],
  },
  {
    label: "Rent",
    children: [{ title: "Rent Gmail", url: "/rent", icon: Mail }],
  },
  {
    label: "Manager",
    children: [{ title: "User", url: "/manager", icon: Users }],
  },
];

export interface IHeaderHomePage {
  colorWhite?: boolean;
  showSheet: boolean;
  setShowSheet: (item: boolean) => void;
  className: string;
}

const CustomDrawer: React.FC<IHeaderHomePage> = ({
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
        <div className="w-full max-w-[1190px] flex py-3 px-8 md:px-0 gap-10 justify-between items-center">
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
                  {navData.map((section, index) => (
                    <div key={index} className="space-y-2 mt-4">
                      <h3 className="text-lg font-semibold">{section.label}</h3>
                      {section.children.map((item, i) => (
                        <Link
                          key={i}
                          href={item.url}
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                        >
                          <item.icon className="w-5 h-5" />
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/">
              <Image
                src={colorWhite ? logoColor : logo}
                alt="Logo"
                className="w-[50px] object-cover"
              />
            </Link>
          </div>
          <Link href="/login">
            <Button className="text-white bg-emerald-500 hover:bg-emerald-600">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomDrawer;
