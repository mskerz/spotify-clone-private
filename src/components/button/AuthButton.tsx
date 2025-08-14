"use client";

import useAuth from "@/hooks/auth";
import UserMenuDropDown from "../dropdown/UserMenuDropDown";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

function AuthButton() {
  const { auth } = useAuth();
  const { user, isLoggedIn, loading } = auth;

  return (
    <>
      {loading ? (
        <Skeleton className="h-9 w-9 rounded-full" />
      ) : user && isLoggedIn ? (
        <UserMenuDropDown />
      ) : (
        <>
          <Link
            href="/login"
            className="button-spotify rounded-full px-5 py-2 font-semibold transition-colors"
          >
            Login
          </Link>

          <Link
            href="/admin/login"
            className=" hidden md:inline-block text-accent-foreground hover:bg-accent hover:text-accent-foreground rounded-3xl px-2 py-2 font-medium transition-all"
          >
            Admin Login
          </Link>
        </>
      )}
    </>
  );
}
export default AuthButton;
