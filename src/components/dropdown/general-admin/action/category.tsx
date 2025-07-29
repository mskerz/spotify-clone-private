"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { MoreVertical, Trash } from "lucide-react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { UpdateCategoryDialog } from "@/components/dialog/general-admin/category";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCategoryMutation } from "@/libs/rtk/category";
import Category from "@/types/category";

type SongActionDropdownProps = {
  row: Category;
};
function CategoryActionDropdown({ row }: SongActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    await deleteCategory(row.id)
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Can't delete category. in this time.");
      });
  };
  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          asChild
        >
          <UpdateCategoryDialog
            selectedCategory={row}
            onClose={() => setOpen(false)}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ConfirmDialog
            id={row.id}
            title="Are you sure?"
            description="Are you sure you want to delete this category?"
            onClose={() => setOpen(false)}
            onClick={handleDelete}
          >
            <div className="flex items-center gap-2 ">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </div>
          </ConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategoryActionDropdown;
