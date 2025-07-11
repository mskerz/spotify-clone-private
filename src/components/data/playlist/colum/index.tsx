"use client";

import useAuth from "@/hooks/auth";
import { PlaylistItemProps } from "@/types/props";
import Image from "next/image";
import Link from "next/link";

function ColumnPlaylist({ item }: PlaylistItemProps) {
  const user = useAuth().auth.user;
  return (
    <Link href={`/account/playlist/${item.id}`} className="hover:bg-accent flex items-center gap-4 rounded-2xl py-3 transition-all">
      <Image
        src={item.coverImage || "/default-playlist.png"}
        alt={item.name}
        width={100}
        height={100}
        className="ml-4 h-20 w-20 object-cover"
      />
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm font-normal text-gray-500">
          {" "}
          Playlists - {user?.detail.lastName}
        </p>
      </div>
    </Link>
  );
}
export default ColumnPlaylist;
