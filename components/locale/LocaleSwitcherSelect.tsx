"use client";

import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { languages } from "@/i18n/locale";

type Props = {
  defaultValue: string;
  label: string;
  colorWhite?: boolean;
  value: string;
};

const LocaleSwitcherSelect: React.FC<Props> = ({
  defaultValue,
  label,
  colorWhite,
  value,
}) => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onSelectChange}
    >
      <SelectTrigger
        className={`w-fit h-8 border-none ${colorWhite ? "bg-transparent text-black opacity-70" : "bg-sky-900 text-white"} focus:ring-0 focus:ring-offset-0`}
        aria-label={label}
      >
        <SelectValue>
          <Image
            src={languages.find((item) => item.key === value)?.img}
            alt="flag"
            className="object-cover w-[22px] h-[22px] rounded-full"
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            <div className="flex items-center">
              <Image
                src={languages.find((item) => item.key === locale)?.img}
                alt="flag"
                className="object-cover w-[22px] h-[22px] rounded-full"
              />
              <p className="ml-2">
                {languages.find((item) => item.key === locale)?.title}
              </p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcherSelect;
