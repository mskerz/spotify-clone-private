"use client";

import Image from "next/image";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import { ChildrenProps } from "@/types/props";
import { Song } from "@/types/song";
import { CirclePlusIcon ,ShareIcon ,DownloadIcon} from "lucide-react";

interface SongContextMenuProps extends ChildrenProps {
  song: Song;
}
function SongContextMenu({ children, song }: SongContextMenuProps) {
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
            />
            <div className="ml-3">
              <p className="text-sm font-medium leading-none">{song.title}</p>
              <p className="text-xs text-muted-foreground">{song.artist}</p>
            </div>
          </div>

        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem asChild>
             <div className="flex items-center cursor-pointer">
              <CirclePlusIcon size={20} />
              <span className="ml-2">Add to your collection</span>
            </div>
        </ContextMenuItem>
        <ContextMenuItem asChild>
            <div className="flex items-center cursor-pointer">
              <ShareIcon size={20} />
              <span className="ml-2">Share</span>
            </div>
        </ContextMenuItem>
        <ContextMenuItem asChild>
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
