import LayoutAuth from "@/layout/auth/LayoutAuth";
import React from "react";
import { useTranslations } from "next-intl";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const t = useTranslations();
  return (
    <LayoutAuth
      title={t("register.title")}
      description={t("register.description")}
      href="/login"
      titleHref={t("login.title")}
    >
      {children}
    </LayoutAuth>
  );
};
export default Layout;
