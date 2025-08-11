"use client";

import SongCard from "@/components/card/SongCard";
import SongContextMenu from "@/components/context-menu/SongContextMenu";
import useAuth from "@/hooks/auth";
import { Song } from "@/types/song";

type SongProps = {
  songs: Song[];
};
function SongList({ songs }: SongProps) {
  const { auth } = useAuth();

  if (songs.length === 0) {
    return <p className="text-center text-lg font-medium text-gray-400">No songs available.</p>;
  }

  return (
    <div
      className="
    mt-8 mx-auto px-4
    grid grid-flow-row auto-rows-auto gap-6
    grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    max-w-full 
  "
    >
      {songs.map((song) => (
        <SongContextMenu
          song={song}
          key={song.id}
        >
          <SongCard
            song={song}
            auth={auth}
          />
        </SongContextMenu>
      ))}
    </div>
  );
}

export default SongList;
