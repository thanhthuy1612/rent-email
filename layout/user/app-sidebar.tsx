"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { navData } from "@/layout/user/nav-data";
import Image from "next/image";
import logo from "@/public/imgs/logo.png";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { getPathName } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

export function AppSidebar() {
  const pathname = usePathname();

  const { toggleSidebar, open } = useSidebar();
  const handleClickOpen = () => {
    toggleSidebar();
  };
  const pathActive = getPathName(pathname);
  const { scopes } = useAppSelector((item) => item.user);
  const navs =
    scopes === "admin"
      ? navData
      : navData.filter((item) => item.label !== "Manager");
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-nav-header">
        <div
          className={`flex justify-between h-[65px] items-center ${open && "px-2"}`}
        >
          {open && (
            <a href="/">
              <Image
                src={logo}
                alt="download-img"
                className="w-[100%] object-cover max-w-[25px]"
              />
            </a>
          )}
          <button
            onClick={handleClickOpen}
            className="icon-gradient cursor-pointer"
          >
            {open ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-nav-body text-nav-text">
        {navs.map((nav) => (
          <SidebarGroup key={nav.label}>
            <SidebarGroupLabel className="text-nav-label text-[0.85rem]">
              {nav.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav?.children.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`py-5 hover:!text-nav-item-active hover:!bg-nav-item-background-active ${!!(pathActive === item.url) && "!text-nav-item-active !bg-nav-item-background-active"}`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
