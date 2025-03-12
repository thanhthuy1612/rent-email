import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

const Home: React.FC = () => {
  const t = useTranslations();

  return <div>{t("HomePage.title")}</div>;
};
export default Home;
