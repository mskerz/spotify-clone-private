"use client";

import { useState } from "react";

import Image from "next/image";

import { PlusIcon } from "lucide-react";

import { Song } from "@/types/song";
import { AuthState } from "@/types/state";
import OpenControl from "@/types/state/control";

import AddSongToPlaylist from "../dialog/AddSongToPlaylist";

type SongCardProps = {
  song: Song;
  auth: AuthState;
};

function SongCard({ song, auth }: SongCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // สร้าง control object แบบ manual เพื่อควบคุมให้ดีขึ้น
  const control: OpenControl = {
    isOpen: isDialogOpen,
    setIsOpen: setIsDialogOpen,
    open: () => setIsDialogOpen(true),
    close: () => setIsDialogOpen(false),
    toggle: () => setIsDialogOpen((prev) => !prev),
  };

  return (
    <div
      className=" flex max-w-3xs w-full   flex-col items-center gap-4   scale-85 hover:scale-80 transition-all duration-200 ease-in-out  hover:opacity-80 "

    >
         <Image
          src={song.coverImage}
          alt={song.title}
          width={160}
          height={160}
          priority
          className=" h-auto md:h-60 w-full bg-cover    object-cover rounded-md"
        
        />
      <div className="flex w-full flex-col  my-2">
        <p className="  text-xl font-normal">{song.title}</p>
        <p className=" "> {song.artist} 
        </p>
       

        {/* {auth.isLoggedIn && (
          <AddSongToPlaylist songId={song.id} control={control}>
            <div className="flex items-center cursor-pointer">
              <PlusIcon size={20} />
              <span className="ml-2">Playlist</span>
            </div>
          </AddSongToPlaylist>
        )} */}
      </div>
    </div>
  );
}

export default SongCard;
