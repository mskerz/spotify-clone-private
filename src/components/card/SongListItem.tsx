"use client";

import { Song } from "@/types/song";
import Image from "next/image";
import SongItemDropdownMenu from "../dropdown/SongItemDropdownMenu";

interface SongProps {
    song: Song
}
function SongListItem( { song }: SongProps) {
  return (
         <div
          key={song.id}
          className="my-2 flex items-center justify-between hover:bg-accent rounded-md p-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
          {" "}
          <div className="flex items-center">
            {" "}
            <Image
              src={song.coverImage}
              alt={song.title}
              width={50}
              height={50}
            />{" "}
            <div className="ml-4">
              {" "}
              <p className="text-primary">{song.title}</p> <p className="text-muted-foreground"> {song.artist}</p>{" "}
            </div>{" "}
          </div>{" "}
          <SongItemDropdownMenu song={song} />{" "}
        </div>
  );
}
export default SongListItem;
