import LayoutAuth from "@/layout/auth/LayoutAuth";
import React from "react";
import { useTranslations } from "next-intl";
import Register from "@/pages/register/Register";

// ----------------------------------------------------------------------

const Page: React.FC = () => {
  const t = useTranslations();
  return (
    <LayoutAuth
      title={t("register.title")}
      description={t("register.description")}
      href="/login"
      titleHref={t("login.title")}
    >
      <Register />
    </LayoutAuth>
  );
};
export default Page;
