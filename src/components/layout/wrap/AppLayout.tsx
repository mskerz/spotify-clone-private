"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { Toaster } from "react-hot-toast";

import { MusicPlayerControls } from "@/components/music-player";
// เพิ่มจาก Shadcn UI
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChildrenProps } from "@/types/props";

import { AppSidebar } from "../AppSidebar";
import Navbar from "../Navbar";
import AuthSessionProvider from "./AuthSessionProvider";
import ReduxProvider from "./ReduxProvider";
import ThemeProvider from "./ThemeProvider";

function AppLayout({ children }: ChildrenProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const pathName = usePathname();
  const isAuthPage = ["/forgot-password", "/reset-password"].includes(pathName);
  useEffect(() => {
    setShowNavigation(!isAuthPage);
  }, [pathName]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <ReduxProvider>
        <AuthSessionProvider>
          <Toaster position="bottom-center" />
          <SidebarProvider>
            <main className="bg-background text-foreground flex min-h-screen w-full">
              {showNavigation && <AppSidebar />}
              <div className="flex-1">
                {showNavigation && <Navbar />}
                {children}
              </div>
            </main>
            <footer>
              <MusicPlayerControls />
            </footer>
          </SidebarProvider>
        </AuthSessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
