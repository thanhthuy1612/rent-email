import LayoutAuth from "@/layout/auth/LayoutAuth";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------
export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const t = useTranslations();
  return (
    <LayoutAuth
      title={t("login.title")}
      description={t("login.description")}
      href="/register"
      titleHref={t("register.title")}
    >
      {children}
    </LayoutAuth>
  );
};
export default Layout;
