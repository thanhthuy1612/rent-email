"use client";

import { loginService } from "@/api/user/login/login.service";
import HeaderUserLayout from "@/components/header/HeaderUserLayout";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { AppSidebar } from "@/layout/user/app-sidebar";
import { updateLoad } from "@/lib/features/load";
import { updateUser } from "@/lib/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const { loadingPage } = useAppSelector((item) => item.load);

  const dispatch = useAppDispatch();
  const t = useTranslations();

  const getUser = async () => {
    try {
      setLoading(true);
      dispatch(updateLoad(true));
      const res = await loginService.profile();
      if (!res.code) {
        dispatch(updateUser(res.data));
      } else {
        toast({
          title: t("alert.error"),
          description: res.message,
          variant: "destructive",
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white"
          ),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(updateLoad(false));
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen">
        {loadingPage || loading ? (
          <LoadingScreen />
        ) : (
          <>
            <HeaderUserLayout />
            <div className="bg-layout-user-bg w-full flex-1 py-7">
              {children}
            </div>
          </>
        )}
      </main>
    </SidebarProvider>
  );
};
export default Layout;
