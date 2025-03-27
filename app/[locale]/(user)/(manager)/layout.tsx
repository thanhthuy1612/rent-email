"use client";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { scopes } = useAppSelector((item) => item.user);
  const router = useRouter();
  React.useLayoutEffect(() => {
    if (scopes !== "admin") {
      router.push("/error/403");
    }
  }, []);
  return <div>{children}</div>;
};
export default Layout;
