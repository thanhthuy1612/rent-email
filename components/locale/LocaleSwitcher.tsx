import * as React from "react";
import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export interface ILocaleSwitcher {
  colorWhite?: boolean;
}
const LocaleSwitcher: React.FC<ILocaleSwitcher> = ({ colorWhite }) => {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2">
      <LocaleSwitcherSelect
        colorWhite={colorWhite}
        defaultValue={locale}
        label="Select a locale"
        value={locale}
      />
    </div>
  );
};

export default LocaleSwitcher;
