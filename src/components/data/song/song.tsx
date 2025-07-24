"use client";

import Image from "next/image";

import { useSelector } from "react-redux";

import { PlusIcon } from "lucide-react";

import SongCard from "@/components/card/SongCard";
import AddSongToPlaylist from "@/components/dialog/AddSongToPlaylist";
import useAuth from "@/hooks/auth";
import { useOpenControl } from "@/hooks/control";
import { RootState } from "@/providers/redux/store";

function SongList() {
  const { filteredSongs: songs } = useSelector(
    (state: RootState) => state.song,
  );

  const AddSongControl = useOpenControl();

  const { auth } = useAuth();
  return (
    <div className="mx-auto mt-8 flex flex-wrap gap-8 rounded-3xl p-10">
      {songs.length === 0 ? (
        <div className="col-span-full">
          <p className="text-center text-lg font-medium text-gray-400">
            No songs available.
          </p>
        </div>
      ) : (
        songs.map((song) => <SongCard song={song} auth={auth} key={song.id} />)
      )}
    </div>
  );
}
export default SongList;
