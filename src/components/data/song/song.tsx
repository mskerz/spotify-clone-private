"use client";

import { RootState } from "@/providers/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

 




function SongList( ) {
 const { filteredSongs: songs } = useSelector((state: RootState) => state.song);
  return (
        <div className="mt-8  flex flex-wrap gap-8 mx-auto p-10 rounded-3xl  ">
          {songs.length === 0 ? (
            <div className="col-span-full">
              <p className="text-center text-gray-400 text-lg font-medium">
                No songs available.
              </p>
            </div>
          ) : (
            songs.map((song) => (
              <div
                key={song.id}
                className="flex flex-col items-center gap-4 border   rounded-2xl p-6 card-gradient  transition-shadow w-64 h-80"
                style={{ minWidth: "16rem", minHeight: "20rem" }}
              >
                <div className="w-40 h-40 flex justify-center items-center">
                  <Image
                    src={song.coverImage}
                    alt={song.title}
                    width={160}
                    height={160}
                    loading="lazy"
                    className="rounded-xl object-cover shadow-md border border-[#23272a] w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1 text-center">
                  <h3 className="text-2xl font-bold  mb-2">
                    {song.title}
                  </h3>
                  <p className=" mb-1">
                    <span className="font-semibold text-[#1ed760]">Artist:</span>{" "}
                    <span className="font-medium">{song.artist}</span>
                  </p>
                  <p className=" text-sm">
                    <span className="font-semibold text-[#1ed760]">Category:</span> {song.category}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
  )
}
export default SongList