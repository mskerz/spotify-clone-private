"use client";

import { User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import Link from "next/link";
import useAuth from "@/hooks/auth";

function UserMenuDropDown() {
  const { auth, handleSignOut } = useAuth();
  const { user } = auth ?? {};

  if (!user || !user.detail) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar className="avatar-outline transition">
          <AvatarImage
            src={user.detail.avatarUrl}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>
            {user.detail.firstName.charAt(0)}
            {user.detail.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sidebar w-54" align="start">
        <DropdownMenuLabel>
          Hi ! <span> {user.detail.firstName}</span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/account/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/setting">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenuDropDown;
