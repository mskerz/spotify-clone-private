"use client";

import { useState } from "react";

import Image from "next/image";

import { FaPlay } from "react-icons/fa";

import { PlayCircleIcon, PlayIcon } from "lucide-react";

import { Song } from "@/types/song";
import { AuthState } from "@/types/state";
import OpenControl from "@/types/state/control";

import { Button } from "../ui/button";
import { playTrack } from "@/providers/redux/slice/music-player";
import { useRedux } from "@/hooks/redux";
type SongCardProps = {
  song: Song;
  auth: AuthState;
};

function SongCard({ song, auth }: SongCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 const {dispatch} = useRedux();
  // สร้าง control object แบบ manual เพื่อควบคุมให้ดีขึ้น
 
  const playSong = () => {
    dispatch(playTrack(song));
  };

  return (
    <div className=" group flex max-w-3xs w-full   flex-col items-center gap-4 p-2 px-4 rounded-md  scale-85 hover:bg-accent transition-all duration-200 ease-in-out select-none">
      <div className="relative overflow-hidden ">
        <Image
          src={song.coverImage}
          alt={song.title}
          width={160}
          height={160}
          priority
          className=" h-50  md:h-60  w-full bg-cover    object-cover rounded-md"
        />
        <Button
          onClick={playSong}
          className="button-spotify w-15 h-15 rounded-full absolute bottom-5 right-5 
             flex items-center justify-center 
             opacity-0 group-hover:opacity-100  hover:scale-110  
             transition-all duration-300 ease-in-out
             cursor-pointer
             "
        >
          <FaPlay
            size={50}
            color="black"
          />
        </Button>
      </div>
      <div className="flex w-full flex-col  my-2">
        <p className="  text-xl font-normal">{song.title}</p>
        <p className=" "> {song.artist}</p>

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
