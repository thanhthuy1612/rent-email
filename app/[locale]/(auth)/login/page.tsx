import LayoutAuth from "@/layout/auth/LayoutAuth";
import Login from "@/components-page/login/Login";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

const Page: React.FC = () => {
  const t = useTranslations();
  return (
    <LayoutAuth
      title={t("login.title")}
      description={t("login.description")}
      href="/register"
      titleHref={t("register.title")}
    >
      <Login />
    </LayoutAuth>
  );
};
export default Page;
