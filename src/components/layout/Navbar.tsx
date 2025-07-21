"use client";

import Link from "next/link";
import { ThemeToggleButton } from "../button/theme";
import { SidebarTrigger } from "../ui/sidebar";
import useAuth from "@/hooks/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon, XIcon } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { useState } from "react";
import AuthButton from "@/components/button/AuthButton";
import { customMenuItems } from "@/constant/menu-item";
import { MdLibraryBooks as Collection } from "react-icons/md";

function Navbar() {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = customMenuItems(
    isLoggedIn
      ? [
          {
            title: "My Collection",
            url: "/account/playlists",
            icon: Collection,
          },
        ]
      : [],
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="sticky top-0 bg-transparent p-2 py-3 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          {!isMobile ? (
            <>
              <SidebarTrigger size="lg" />


              <div className="mr-10 flex space-x-4">
                <ThemeToggleButton />
                <AuthButton />
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2">
                <FaSpotify size={24} className="text-[#1DB954]" />
                <span className="flex items-end gap-1 text-2xl font-bold">
                  Spotify
                  <span className="text-muted-foreground mb-1 align-baseline text-xs font-normal">
                    Private
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <AuthButton />
                <button
                  onClick={toggleMenu}
                  className="hover:bg-accent p-1.5 transition-opacity"
                >
                  {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && isMobile && (
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="hover:bg-accent p-1.5 text-center transition-opacity"
            >
              {item.icon && <item.icon />}
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
