"use client";

import { useRedux } from "@/hooks/redux";
import { getDetailPlaylistById } from "@/providers/redux/slice/playlist";
import { playlistActions } from "@/providers/redux/slice/action";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { MdOutlineImportExport } from "react-icons/md";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import usePlaylist from "@/hooks/auth/playlist";
import useAuth from "@/hooks/auth";

function PlaylistDetailPage() {
  const { dispatch, useSelector } = useRedux();
  const params = useParams();
  const { id } = params;
  const playlistId = Array.isArray(id) ? id[0] : id;

  const { selectedPlaylist, status, fetchPlaylistDetail } = usePlaylist();

  const { user } = useAuth().auth;

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistDetail(playlistId);
    }
  }, [id, fetchPlaylistDetail]);

  if (status.loading) return <div className="flex flex-col">
    <p>Loading...</p>
  </div>;
  if (status.error) return <p>Error: {status.error}</p>;
  return (
    <div className="flex flex-col">
      {selectedPlaylist && (
        <>
          <Image
            src={selectedPlaylist.coverImage}
            alt={selectedPlaylist.name}
            width={200}
            height={200}
            className="h-40 w-40 rounded-full object-cover"
          />
          <div className="mt-4 flex flex-col">
            <h1 className="text-2xl font-bold">{selectedPlaylist.name}</h1>
            <div className="inline-flex">
              <p className="mr-2 font-semibold">By:</p>

              <Avatar className="ml-2 h-6 w-6 rounded-full">
                <AvatarImage src={user?.detail.avatarUrl} />
              </Avatar>
              <p className="ml-2 font-semibold">{user?.detail.firstName}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col space-y-3">
            {selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song) => (
                <div key={song.id} className="mr-4 flex">
                  <Image
                    src={song.coverImage}
                    alt={song.title}
                    width={50}
                    height={50}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                  <div className="ml-4 flex flex-col">
                    <Link href={`/account/song/${song.id}`}>
                      <h3 className="text-lg font-semibold">{song.title}</h3>
                    </Link>
                    <p className="text-sm font-normal text-gray-500">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-secondary/40 rounded-2xl p-3">
                <p className="text-center">
                  {"This playlist doesn't have any songs yet."}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PlaylistDetailPage;
