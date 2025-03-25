import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { routing } from "@/i18n/routing";
// ----------------------------------------------------------------------
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ----------------------------------------------------------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
export const getPathName = (pathName: string) => {
  return "/" + pathName?.split("/")?.slice(2).join("/");
};

// ----------------------------------------------------------------------
export const getLocale = (pathName: string) => {
  return pathName.split("/")[1] ?? "";
};

// ----------------------------------------------------------------------
const sendLocaleToServer = async () => {
  const accessToken = localStorage.getItem("accessToken");

  await fetch("/api/accessToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });
};

// ----------------------------------------------------------------------
export function fNumber(inputValue: number, locale: string) {
  const fm = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(inputValue);

  return fm;
}

// ----------------------------------------------------------------------
export function formatSortNumber(num: number) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(0) + "B+";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(0) + "M+";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + "K+";
  } else {
    return num.toString() + "+";
  }
}
