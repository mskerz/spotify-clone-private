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

function AppLayout({ children }: ChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ReduxProvider>
        <AuthSessionProvider>
          <Toaster position="bottom-center" />
          <SidebarProvider>
            <main className="flex min-h-screen w-full bg-background text-foreground">
              <AppSidebar />
              <div className="flex-1">
                <Navbar />
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
