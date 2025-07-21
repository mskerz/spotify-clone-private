"use client";

import { RootState } from "@/providers/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import AddSongToPlaylist from "@/components/dialog/AddSongToPlaylist";
import { PlusIcon } from "lucide-react";
import useAuth from "@/hooks/auth";

function SongList() {
  const { filteredSongs: songs } = useSelector(
    (state: RootState) => state.song,
  );

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
        songs.map((song) => (
          <div
            key={song.id}
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

              { auth.isLoggedIn &&
                <AddSongToPlaylist songId={song.id}>
                  <div className="flex items-center">
                    <PlusIcon size={20} />
                    <span className="ml-2">Playlist</span>
                  </div>
                </AddSongToPlaylist>
              }
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default SongList;
