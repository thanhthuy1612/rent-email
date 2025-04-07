import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

const UserNav: React.FC = () => {
  const t = useTranslations();

  const nav = [
    { href: "/user", title: t("user.info") },
    { href: "/user/change-password", title: t("user.changePassword") },
  ];
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-5">
        {nav.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`text-zinc-500 py-5 !bg-transparent rounded-none font-semibold text-[16px] hover:border-b-2 hover:border-purple-400 ${
                  pathname === item.href &&
                  "border-b-2 !border-purple-500 text-zinc-950"
                }`}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default UserNav;
