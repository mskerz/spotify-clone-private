"use client";

import { useState } from "react";

import { MoreVertical, Trash } from "lucide-react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import ChangePasswordDialog from "@/components/dialog/super-admin/ChangePasswordDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSuperAdmin } from "@/hooks/auth/admin";
// หรือ path ที่ถูกต้อง
import { AdminUser } from "@/types/user";

type Props = {
  admin: AdminUser;
};
function DropdownAdminActionCell({ admin }: Props) {
  const { deleteAdmin } = useSuperAdmin();

  return (
   <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
          <ChangePasswordDialog admin={admin} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ConfirmDialog
            id={admin.id}
            title="Are you sure?"
            description="Are you sure you want to delete this admin?"
            onClickWithParam={(id) => deleteAdmin(String(id))}
          >
            <div className="flex items-center">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </div>
          </ConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
   </>
  );
}
export default DropdownAdminActionCell;
