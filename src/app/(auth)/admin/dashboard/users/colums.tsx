"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical, Trash } from "lucide-react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import EditAdminDialog from "@/components/dialog/super-admin/ChangePasswordDialog";
import DropdownAdminActionCell from "@/components/dropdown/super-admin/action-cell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSuperAdmin } from "@/hooks/auth/admin";
import { AdminUser } from "@/types/user";

export const columns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("index")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    header: "Full Name",
    accessorKey: "name",
    accessorFn: (row) => `${row.detail.firstName} ${row.detail.lastName}`,
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "detail.age",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
      });
    },
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue("updatedAt"));
  //     return date.toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "2-digit",
  //       minute: "2-digit",
  //       hour: "2-digit",
  //     });
  //   },
  // },

  {
    id: "actions",
    header: "Manage",
    cell: ({ row }) => {
      return <DropdownAdminActionCell admin={row.original} />;
    },
  },
];
