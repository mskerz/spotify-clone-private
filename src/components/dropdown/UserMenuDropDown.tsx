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
import { useRedux } from "@/hook/redux";
import { authActions } from "@/providers/redux/slice/action";

type UserProps = {
  user: User;
};

function UserMenuDropDown({ user }: UserProps) {

    const {dispatch} = useRedux();

    const handleLogout = () => {
        
        dispatch(authActions.signOutUser());
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar  className="outline-2 outline-green-400">
          <AvatarImage src={user.detail.avatarUrl}   referrerPolicy="no-referrer"
/>
          <AvatarFallback>
            {user.detail.firstName.charAt(0)}
            {user.detail.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54 bg-sidebar" align="start">
        <DropdownMenuLabel>Hi !  <span> {user.detail.firstName}</span></DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
         </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenuDropDown;
