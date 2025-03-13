import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import React from "react";

// ----------------------------------------------------------------------
export type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  href: string;
  titleHref: string;
};
const LayoutAuth: React.FC<Props> = ({
  children,
  description,
  title,
  href,
  titleHref,
}) => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-auth-color text-[1.75rem] leading-1.2">
          {title}
        </CardTitle>
        <CardDescription className="flex gap-2 font-medium text-[16.25px] justify-center text-[#b5b5c3]">
          {description}{" "}
          <Link
            href={href}
            className="text-sky-500 hover:text-sky-600 cursor-pointer"
          >
            {titleHref}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </>
  );
};
export default LayoutAuth;
