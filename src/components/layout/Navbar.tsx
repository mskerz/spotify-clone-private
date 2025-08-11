"use client";

import { useState } from "react";

import Link from "next/link";

import { FaSpotify } from "react-icons/fa";
import { MdLibraryBooks as Collection } from "react-icons/md";

import { MenuIcon, XIcon } from "lucide-react";

import AuthButton from "@/components/button/AuthButton";
import { customMenuItems } from "@/constant/menu-item";
import useAuth from "@/hooks/auth";

import { ThemeToggleButton } from "../button/theme";
import { SidebarTrigger } from "../ui/sidebar";

function Navbar() {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

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
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-transparent p-2 py-3 backdrop-blur-2xl z-50 w-full">
      <div className="flex items-center justify-between w-full px-4">
        {/* Desktop Menu */}
        <div className="hidden sm:flex w-full items-center justify-between">
          <SidebarTrigger size="lg" />
          <div className="mr-10 flex space-x-4">
            <ThemeToggleButton />
            <AuthButton />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex sm:hidden w-full items-center max-w-screen  justify-between">
          <div className="inline-flex items-center gap-2">
            <FaSpotify
              size={24}
              className="text-[#1DB954]"
            />
            <span className="flex items-end gap-1 text-2xl font-bold">
              Spotify
              <span className="text-muted-foreground mb-1 align-baseline text-xs font-normal">Private</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <AuthButton />
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={toggleMenu}
              className="hover:bg-accent p-1.5 transition-opacity rounded"
              type="button"
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col bg-background p-2 rounded shadow-md mt-2 sm:hidden w-full px-4">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              onClick={handleLinkClick}
              className="hover:bg-accent p-2 text-center rounded transition-opacity flex items-center justify-center gap-2"
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
