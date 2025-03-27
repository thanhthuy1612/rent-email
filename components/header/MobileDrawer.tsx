"use client";

import { navData } from "@/layout/user/nav-data";
import { useRouter } from "@/i18n/navigation";
import React from "react";
import MobileHeader from "./MobileHeader";
import { useAppSelector } from "@/lib/hooks";

// ----------------------------------------------------------------------

const MobileDrawer: React.FC = () => {
  const [showHeader, setShowHeader] = React.useState<boolean>(false);
  const [showSheet, setShowSheet] = React.useState<boolean>(false);
  const router = useRouter();
  const { scopes } = useAppSelector((item) => item.user);
  const handleNavigate = (url: string) => () => {
    setShowSheet(false);
    router.push(url);
  };
  const renderNavLanding = (colorWhite: boolean) => <></>;

  const navs =
    scopes === "admin"
      ? navData
      : navData.filter((item) => item.label !== "Manager");

  const renderNavSheet = () => (
    <div className="flex flex-col w-full gap-3 px-4">
      {navs.map((section) => (
        <div key={section.label} className="flex flex-col">
          <div className="font-semibold text-lg">{section.label}</div>
          {section.children.map((item) => (
            <div key={item.title} onClick={handleNavigate(item.url)}>
              <div
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[1rem] font-normal">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <MobileHeader
        navLanding={renderNavLanding(showHeader)}
        navSheet={renderNavSheet()}
        showSheet={showSheet}
        setShowSheet={setShowSheet}
        className={
          showHeader
            ? "landing-header sticky top-0 z-10 transition duration-300"
            : ""
        }
        colorWhite={showHeader}
      />
    </>
  );
};
export default MobileDrawer;
