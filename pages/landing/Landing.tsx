"use client";

import HeaderHomePage from "@/components/header/HeaderHomePage";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Footer from "@/pages/landing/components/Footer";
import Home from "@/pages/landing/components/Home";
import Introduce from "@/pages/landing/components/Introduce";
import Policy from "@/pages/landing/components/Policy";
import Service from "@/pages/landing/components/Service";
import { MoveUp } from "lucide-react";
import React from "react";

// ----------------------------------------------------------------------

const Landing: React.FC = () => {
  const refHome = React.useRef<HTMLDivElement | null>(null);
  const refIntroduce = React.useRef<HTMLDivElement | null>(null);
  const refService = React.useRef<HTMLDivElement | null>(null);
  const refPolicy = React.useRef<HTMLDivElement | null>(null);

  const navLanding = [
    { title: "Home", ref: refHome },
    { title: "Introduce", ref: refIntroduce },
    { title: "Service", ref: refService },
    { title: "Policy", ref: refPolicy },
  ];

  const [current, setCurrent] = React.useState<string | null>(
    navLanding[0].title
  );
  const [showHeader, setShowHeader] = React.useState<boolean>(false);
  const [showSheet, setShowSheet] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const scrollToDiv = (ref: HTMLDivElement | null, title: string) => {
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      setCurrent(title);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    let min = 0;
    let value = navLanding[0].title;
    if (refIntroduce.current) {
      const { top } = refIntroduce.current.getBoundingClientRect();
      setShowHeader(top <= 0);
      min = Math.abs(top);
      value = navLanding[1].title;
    }
    if (refPolicy.current) {
      const { top } = refPolicy.current.getBoundingClientRect();
      const minRef = Math.abs(top);
      if (minRef < min) {
        min = minRef;
        value = navLanding[3].title;
      }
    }
    if (refService.current) {
      const { top } = refService.current.getBoundingClientRect();
      const minRef = Math.abs(top);
      if (minRef < min) {
        min = minRef;
        value = navLanding[2].title;
      }
    }
    if (refHome.current) {
      const { top } = refHome.current.getBoundingClientRect();
      const minRef = Math.abs(top);
      if (minRef < min) {
        min = minRef;
        value = navLanding[0].title;
      }
    }
    setCurrent(value);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getClassNameNavButton = (colorWhite: boolean, title: string) => {
    if (!colorWhite) {
      return `${title === current ? "!text-white" : "text-white opacity-50"} hover:text-sky-500`;
    }
    return `${title === current ? "!text-sky-600" : "text-black opacity-50"} hover:text-sky-500`;
  };

  const renderNavLanding = (colorWhite: boolean) => (
    <NavigationMenu>
      <NavigationMenuList>
        {navLanding.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Button
              className={`border-none shadow-none ${colorWhite ? "!bg-white" : "!bg-landing"} cursor-pointer px-3`}
              onClick={() => scrollToDiv(item.ref.current, item.title)}
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-[1rem] font-normal !bg-transparent ${getClassNameNavButton(colorWhite, item.title)}`}
              >
                {item.title}
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  const renderNavSheet = () => (
    <div className="flex flex-col w-full gap-3">
      {navLanding.map((item) => (
        <div
          onClick={async () => {
            scrollToDiv(item.ref.current, item.title);
          }}
          key={item.title}
          className={`${navigationMenuTriggerStyle()} text-[1rem] font-normal !bg-transparent ${getClassNameNavButton(true, item.title)}`}
        >
          {item.title}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <HeaderHomePage
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
      {isVisible && (
        <Button
          className="fixed bottom-3 right-3 bg-sky-500 hover:bg-sky-600 cursor-pointer"
          onClick={scrollToTop}
        >
          <MoveUp />
        </Button>
      )}
      <Home ref={refHome} />
      <Introduce ref={refIntroduce} />
      <Service ref={refService} />
      <Policy ref={refPolicy} />
      <Footer />
    </>
  );
};
export default Landing;
