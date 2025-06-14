"use client";

import * as React from "react";
import { ChildrenProps } from "@/types/props";
import ReduxProvider from "./ReduxProvider";
import SideBar from "../SideBar";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";
import ThemeProvider from "./ThemeProvider";
import AuthSessionProvider from "./AuthSessionProvider";

function AppLayout({ children }: ChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ReduxProvider>
        <AuthSessionProvider>
          <Toaster position="bottom-center" />
          <div className="flex min-h-screen w-full bg-background text-foreground">
            <SideBar />
            <div className="flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </AuthSessionProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
