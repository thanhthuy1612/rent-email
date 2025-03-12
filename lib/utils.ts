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
export function fNumber(inputValue: number, locale: string) {
  const fm = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(inputValue);

  return fm;
}
