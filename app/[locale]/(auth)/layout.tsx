"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLoad } from "@/lib/features/load";
import LoadingScreen from "@/components/loading/LoadingScreen";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loadingPage } = useAppSelector((item) => item.load);

  React.useLayoutEffect(() => {
    const checkLogin = () => {
      dispatch(updateLoad(true));
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        router.push("/user");
      }
      dispatch(updateLoad(false));
    };
    checkLogin();
  }, []);

  if (loadingPage) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex p-10 flex-col gap-5 min-h-screen w-full justify-center items-center">
      <Link href={"/"} className="font-bold">
        CH-OTP
      </Link>
      <Card className="max-w-[500px] w-full">{children}</Card>
    </div>
  );
};
export default Layout;
