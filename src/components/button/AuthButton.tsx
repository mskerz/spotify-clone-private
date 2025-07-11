"use client";

import useAuth from "@/hooks/auth";
import UserMenuDropDown from "../dropdown/UserMenuDropDown";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

function AuthButton() {
    const {auth} = useAuth();
    const {user, isLoggedIn, loading} = auth
    
  return (
    <>
     {loading ? (
                  <Skeleton className="h-9 w-9 rounded-full" />
                ) : user && isLoggedIn ? (
                  <UserMenuDropDown />
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full  px-5 py-2 font-semibold button-spotify   transition-colors "
                  >
                    Login
                  </Link>
                )}
    </>
  )
}
export default AuthButton
