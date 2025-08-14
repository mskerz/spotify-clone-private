"use client";

import { CirclePlusIcon, MoreVertical, ShareIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenControl } from "@/hooks/control";
import { Song } from "@/types/song";

import AddSongToPlaylist from "../dialog/AddSongToPlaylist";
import ShareSongDialog from "../dialog/ShareSongDialog";
import { Button } from "../ui/button";

function SongItemDropdownMenu({ song }: { song: Song }) {
  const control = useOpenControl();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AddSongToPlaylist
            songId={song.id}
            control={control}
          >
            <div className="flex items-center cursor-pointer">
              <CirclePlusIcon size={20} />
              <span className="ml-2">Add to your collection</span>
            </div>
          </AddSongToPlaylist>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareSongDialog song={song}>
            <div className="flex items-center cursor-pointer">
              <ShareIcon size={20} />
              <span className="ml-2">Share</span>
            </div>
          </ShareSongDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SongItemDropdownMenu;
