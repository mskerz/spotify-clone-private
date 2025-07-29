"use client";

import Image from "next/image";

import { useSelector } from "react-redux";

import { PlusIcon } from "lucide-react";

import SongCard from "@/components/card/SongCard";
import AddSongToPlaylist from "@/components/dialog/AddSongToPlaylist";
import useAuth from "@/hooks/auth";
import { useOpenControl } from "@/hooks/control";
import { RootState } from "@/providers/redux/store";
import { Song } from "@/types/song";

type SongProps = {
  songs: Song[];
};
function SongList({ songs }: SongProps) {
    const { auth } = useAuth();

  if (songs.length === 0) {
    return (
      <p className="text-center text-lg font-medium text-gray-400">
        No songs available.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-8 flex flex-wrap gap-8 rounded-3xl p-10">
      {songs.map((song) => (
        <SongCard auth={auth} song={song} key={song.id} />
      ))}
    </div>
  );
}
export default SongList;
