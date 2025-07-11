"use client";

import useAuth from "@/hooks/auth";
import { PlaylistItemProps } from "@/types/props";
import Image from "next/image";

function GridPlaylist({ item }: PlaylistItemProps) {
    const user = useAuth().auth.user
  return (
    <div
      
      className="my-2 flex flex-col items-start rounded-xl transition-all hover:bg-accent"
    >
      <div className="relative mb-3 w-full overflow-hidden pt-[100%]">
        <Image
          src={item.coverImage || "/default-playlist.png"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <p className="font-semibold">{item.name}</p>
      <p className="text-sm font-normal text-gray-500">
        {" "}
        Playlists - {user?.detail.firstName}
      </p>
    </div>
  );
}
export default GridPlaylist;
