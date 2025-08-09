"use client";

import { useState } from "react";

import Image from "next/image";

import { CirclePlusIcon, DownloadIcon, PlusIcon, ShareIcon } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useAuth from "@/hooks/auth";
import { ChildrenProps } from "@/types/props";
import { Song } from "@/types/song";
import OpenControl from "@/types/state/control";

import AddSongToPlaylist from "../dialog/AddSongToPlaylist";
import ShareSongDialog from "../dialog/ShareSongDialog";
import { useOpenControl } from "@/hooks/control";

interface SongContextMenuProps extends ChildrenProps {
  song: Song;
}
function SongContextMenu({ children, song }: SongContextMenuProps) {
  const { isLoggedIn } = useAuth().auth;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const control = useOpenControl();
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="h-full ">
        <ContextMenuLabel asChild>
          <div className="flex items-center py-4.5">
            <Image
              className="w-fit h-fit rounded-md"
              src={song.coverImage}
              alt={song.title}
              width={50}
              height={50}
              loading="lazy"
            />
            <div className="ml-3">
              <p className="text-sm font-medium leading-none">{song.title}</p>
              <p className="text-xs text-muted-foreground">{song.artist}</p>
            </div>
          </div>
        </ContextMenuLabel>
        <ContextMenuSeparator />
        {isLoggedIn && (
          <ContextMenuItem>
            <AddSongToPlaylist
              songId={song.id}
              control={control}
            >
              <div className="flex items-center cursor-pointer">
                <CirclePlusIcon size={20} />
                <span className="ml-2">Add to your collection</span>
              </div>
            </AddSongToPlaylist>
          </ContextMenuItem>
        )}
        <ContextMenuItem>
          <ShareSongDialog song={song}>
            <div className="flex items-center cursor-pointer">
              <ShareIcon size={20} />
              <span className="ml-2">Share</span>
            </div>
          </ShareSongDialog>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <div className="flex items-center cursor-pointer">
            <DownloadIcon size={20} />
            <span className="ml-2">Download</span>
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
export default SongContextMenu;
