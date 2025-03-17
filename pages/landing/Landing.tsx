import Home from "@/pages/landing/components/Home";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

const Landing: React.FC = () => {
  const t = useTranslations();

  return (
    <div>
      <Home />
    </div>
  );
};
export default Landing;
