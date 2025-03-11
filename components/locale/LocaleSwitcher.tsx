import * as React from "react";
import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

const LocaleSwitcher: React.FC = () => {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2">
      <LocaleSwitcherSelect defaultValue={locale} label="Select a locale" />
    </div>
  );
};

export default LocaleSwitcher;
