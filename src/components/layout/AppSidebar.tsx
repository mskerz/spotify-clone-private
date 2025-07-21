"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items, customMenuItems } from "@/constant/menu-item";
import useAuth from "@/hooks/auth";
import { Home, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaSpotify } from "react-icons/fa";
import { MdLibraryBooks as Collection, MdDashboard } from "react-icons/md";

// Menu items.

export function AppSidebar() {
  const { isLoggedIn, user } = useAuth().auth;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const menuItems = customMenuItems([
    ...(isLoggedIn
      ? [
          {
            title: "My Collection",
            url: "/account/playlists",
            icon: Collection,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            title: "Admin Dashboard",
            url: "/admin/dashboard",
            icon: MdDashboard,
          },
        ]
      : []),
  ]);
  return (
    <Sidebar>
      <SidebarHeader className="my-2.5 mb-4 flex flex-row items-center gap-4 text-xl font-semibold tracking-wide">
        <FaSpotify size={24} className="text-[#1DB954]" />
        <span className="flex items-end gap-1 text-2xl font-bold">
          Spotify
          <span className="text-muted-foreground mb-1 align-baseline text-xs font-normal">
            Private
          </span>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-5" aria-label="">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon &&
                        React.createElement(item.icon, { size: 20 })}
                      <span className="text-[15px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
