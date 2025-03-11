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
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { languages } from "@/i18n/locale";

type Props = {
  defaultValue: string;
  label: string;
};

const LocaleSwitcherSelect: React.FC<Props> = ({ defaultValue, label }) => {
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
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger
        className="w-[180px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0"
        aria-label={label}
      >
        <SelectValue />
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
