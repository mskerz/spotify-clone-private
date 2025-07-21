"use client";

import { useRedux } from "@/hooks/redux";
import { ItemDisplayType, ItemDisplay } from "@/types/enum/display";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import PlaylistLoadingColumn from "./colum/loading";
import ColumnPlaylist from "./colum";
import GridPlaylist from "./grid";
import usePlaylist from "@/hooks/auth/playlist";

function Playlists({ display }: ItemDisplayType) {
  const {playlists,status:{loading}}= usePlaylist();
  return (
    <>
      {display === ItemDisplay.COLUMN ? (
        <div className="flex flex-col">
          {loading ? (
            <PlaylistLoadingColumn />
          ) : playlists && playlists.length > 0 ? (
            playlists.map((playlist) => (
              <ColumnPlaylist key={playlist.id} item={playlist} />
            ))
          ) :  <p className="col-span-full text-center">No playlists found.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <p className="col-span-full text-center">No playlists found.</p>
          ) :playlists && playlists.length > 0 ? (
            playlists.map((playlist) => (
               <GridPlaylist key={playlist.id} item={playlist} />
            ))
          ) : null}
        </div>
      )}
    </>
  );
}
export default Playlists;
