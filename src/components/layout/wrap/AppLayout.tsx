"use client";

import * as React from "react";
import { ChildrenProps } from "@/types/props";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";
import ThemeProvider from "./ThemeProvider";
import AuthSessionProvider from "./AuthSessionProvider";

// เพิ่มจาก Shadcn UI
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function AppLayout({ children }: ChildrenProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const pathName = usePathname();
  const isAuthPage = ["/forgot-password", "/reset-password"].includes(pathName);
  useEffect(() => {
    setShowNavigation(!isAuthPage);
  }, [pathName]);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
          </SidebarProvider>
        </AuthSessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
