"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Category from "@/types/category";
import CategoryActionDropdown from "@/components/dropdown/general-admin/action/category";

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    header: "Last Created",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const formatDate = new Date(row.original.createdAt ? row.original.createdAt : "2025-06-20").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span className="text-gray-400 italic"> {formatDate}</span>;
    },
  },

  {
    header: "Last Updated",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const formatDate = new Date(row.original.updatedAt ? row.original.updatedAt :  row.original.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span className="text-gray-400 italic"> {formatDate ? formatDate : "-"}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      return (
        <CategoryActionDropdown row={row.original} />
      );
    },
  },
];

export default columns;
