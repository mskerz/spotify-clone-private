"use client";

import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ThemeToggleButton } from "../button/theme";
import UserMenuDropDown from "../dropdown/UserMenuDropDown";
import { SidebarTrigger } from "../ui/sidebar";
import useAuth  from "@/hooks/auth"

function Navbar() {
  const {auth} = useAuth()
  const {user, isLoggedIn, loading} = auth
 
  return (
    <nav className="sticky top-0 flex items-center justify-between bg-transparent p-2 py-3 backdrop-blur-2xl">
              <SidebarTrigger size={"lg"} />

      <ul className="flex space-x-8 font-medium">
        <li className="w-sm">
          <input
            type="text"
            placeholder="Search"
            className="bg-secondary outline-secondary w-full rounded-full px-4 py-2 outline-1"
          />
        </li>
      </ul>
      <div className="mr-10 flex space-x-4">
         <ThemeToggleButton />
        {loading ? (
          <Skeleton className="h-9 w-9 rounded-full" />
        ) : user && isLoggedIn ? (
             <UserMenuDropDown  />
           
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-[#1ED760] px-5 py-2 font-semibold text-black transition-colors hover:bg-[#1db954]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
