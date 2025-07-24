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
      className="card-gradient flex h-80 w-64 flex-col items-center gap-4 rounded-2xl border p-6 transition-shadow"
      style={{ minWidth: "16rem", minHeight: "20rem" }}
    >
      <div className="flex h-40 w-40 items-center justify-center">
        <Image
          src={song.coverImage}
          alt={song.title}
          width={160}
          height={160}
          loading="lazy"
          className="h-full w-full rounded-xl border border-[#23272a] object-cover shadow-md"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 text-center">
        <h3 className="mb-2 text-2xl font-bold">{song.title}</h3>
        <p className="mb-1">
          <span className="font-semibold text-[#1ed760]">Artist:</span>{" "}
          <span className="font-medium">{song.artist}</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-[#1ed760]">Category:</span>{" "}
          {song.category}
        </p>

        {auth.isLoggedIn && (
          <AddSongToPlaylist songId={song.id} control={control}>
            <div className="flex items-center cursor-pointer">
              <PlusIcon size={20} />
              <span className="ml-2">Playlist</span>
            </div>
          </AddSongToPlaylist>
        )}
      </div>
    </div>
  );
}

export default SongCard;
