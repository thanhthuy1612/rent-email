"use client";

import HeaderUserLayout from "@/components/header/HeaderUserLayout";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/user/app-sidebar";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { loadingPage } = useAppSelector((item) => item.load);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen">
        <HeaderUserLayout />
        <div className="bg-layout-user-bg w-full flex-1 py-7">
          {loadingPage ? <LoadingScreen /> : children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
