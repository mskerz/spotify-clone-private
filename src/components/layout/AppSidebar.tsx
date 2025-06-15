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
import {
  Calendar,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { MdLibraryBooks as Collection } from "react-icons/md";
import { Button } from "../ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Your Collection",
    url: "#",
    icon: Collection,
  },
];

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-[15px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="w-full cursor-pointer rounded-3xl bg-[#1DB954] hover:bg-[#1DB954] active:bg-[#1DB954]"
                  asChild
                >
                  <div className="flex items-center justify-center gap-3">
                    <Plus />
                    <span className="text-[15px]">Create Playlist</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
