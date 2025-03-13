import { Card } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/imgs/logo.webp";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex p-10 flex-col gap-10 min-h-screen w-full justify-center items-center">
      <Image
        src={logo}
        alt="download-img"
        className="w-[100%] object-cover max-w-[50px]"
      />
      <Card className="max-w-[500px] w-full">{children}</Card>
    </div>
  );
};
export default Layout;
