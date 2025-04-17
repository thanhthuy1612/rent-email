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
import Footer from "@/components-page/landing/components/Footer";
import Home from "@/components-page/landing/components/Home";
import Introduce from "@/components-page/landing/components/Introduce";
import Policy from "@/components-page/landing/components/Policy";
import Service from "@/components-page/landing/components/Service";
import { MoveUp } from "lucide-react";
import React from "react";
import { useRouter } from "@/i18n/navigation";

// ----------------------------------------------------------------------

const Landing: React.FC = () => {
  const refHome = React.useRef<HTMLDivElement | null>(null);
  const refIntroduce = React.useRef<HTMLDivElement | null>(null);
  const refService = React.useRef<HTMLDivElement | null>(null);
  const refPolicy = React.useRef<HTMLDivElement | null>(null);

  const navLanding = [
    { title: "Trang chủ", ref: refHome },
    { title: "Giới thiệu", ref: refIntroduce },
    { title: "Dịch vụ", ref: refService },
    { title: "Chính sách", ref: refPolicy },
    { title: "Api Key", url: "/api-doc" },
  ];

  const [current, setCurrent] = React.useState<string | null>(
    navLanding[0].title
  );
  const [showHeader, setShowHeader] = React.useState<boolean>(false);
  const [showSheet, setShowSheet] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const router = useRouter();

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

  const onHandleClick = (
    title: string,
    ref?: HTMLDivElement | null,
    url?: string
  ) => {
    if (ref) {
      scrollToDiv(ref, title);
    } else if (url) {
      router.push(url);
    }
  };

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
              onClick={() =>
                onHandleClick(item.title, item.ref?.current, item.url)
              }
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
          onClick={() => onHandleClick(item.title, item.ref?.current, item.url)}
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
          className="fixed bottom-3 opacity-65 z-10 right-3 button-color"
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
