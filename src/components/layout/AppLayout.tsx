"use client";

import { ChildrenProps } from "@/types/props";
import AuthSessionProvider from "./AuthSession";
import ReduxProvider from "./ReduxProvider";
import SideBar from "./SideBar";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

function AppLayout({ children }: ChildrenProps) {
  return (
    <>
      <ReduxProvider>
        <AuthSessionProvider>
          <Toaster position="bottom-center" />
          <div className="flex min-h-screen w-full bg-[#121212]">
            <SideBar />
            <div className="flex-1">
              <Navbar />
              {children}
            </div>
          </div>
          
        </AuthSessionProvider>
      </ReduxProvider>
    </>
  );
}
export default AppLayout;
