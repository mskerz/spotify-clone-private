"use client";

import { useRedux } from "@/hooks/redux";
import { getDetailPlaylistById } from "@/providers/redux/slice/playlist";
import { playlistActions } from "@/providers/redux/slice/action";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { MdOutlineImportExport } from "react-icons/md";
import toast from "react-hot-toast";

type PlaylistParams = {
  params: Promise<{ id: string }>;
};

function PlaylistDetailPage({ params }: PlaylistParams) {
  const { dispatch, useSelector } = useRedux();
  const { selectedPlaylist } = useSelector((state) => state.playlist);

  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  const fetchDetailPlaylistById = () => {
    dispatch(playlistActions.getPlaylistById(parseInt(id)))
      .unwrap()
      .then(() => {
        toast.success("fetch for DetailPlaylistById success");
      }).catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    fetchDetailPlaylistById();
  }, [id]);

  return (
    <div className="flex flex-col">
      {selectedPlaylist && (
        <>
          <Image
            src={selectedPlaylist.coverImage}
            alt={selectedPlaylist.name}
            width={200}
            height={200}
          />
          <Link href={selectedPlaylist.coverImage}> Click</Link>
          <p className="text-xl">{selectedPlaylist.name}</p>
        </>
      )}
    </div>
  );
}

export default PlaylistDetailPage;
