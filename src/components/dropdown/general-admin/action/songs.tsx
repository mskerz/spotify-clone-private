"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { MoreVertical, Trash } from "lucide-react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { UpdateSongDialog } from "@/components/dialog/general-admin/song";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteSongMutation } from "@/libs/rtk/song";
import { Song } from "@/types/song";

type SongActionDropdownProps = {
  row: Song;
};
function SongActionDropdown({ row }: SongActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const [deleteSong] = useDeleteSongMutation();

  const handleDelete = async () => {
    await deleteSong(row.id)
      .unwrap()
      .then(() => {
        toast.success("Song deleted successfully.");
      })
      .catch((error) => {
        toast.error(error.message);
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
          <UpdateSongDialog
            selectedSong={row}
            onClose={() => setOpen(false)}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ConfirmDialog
            id={row.id}
            title="Are you sure?"
            description="Are you sure you want to delete this song?"
            onClose={() => setOpen(false)}
            onClick={handleDelete}
          >
            {" "}
            {/* ✅ เหมือนกัน */}
            <div className="flex items-center gap-2">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </div>
          </ConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongActionDropdown;
