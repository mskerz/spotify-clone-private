"use client";

import { Playlist } from "@/types/song";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Image from "next/image";

type Props = {
  playlist: Playlist;
  isChecked?: boolean;
  onClick: (playlistId: number) => void;
};

function AddSongPlaylistCard({ playlist, onClick, isChecked = false }: Props) {
  return (
    <Card
      className="hover:bg-card/80 w-full cursor-pointer p-2 transition-all"
      onClick={() => onClick(playlist.id)}
    >
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={playlist.coverImage}
            alt={playlist.name}
            width={50}
            height={50}
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <Label htmlFor={`playlist-item-${playlist.id}`}>
              {playlist.name}
            </Label>
            <p className="text-muted-foreground text-sm">
              {playlist.songs.length !== 0 ? (
                <>
                  {playlist.songs.length}{" "}
                  {playlist.songs.length === 1 ? "song" : "songs"}
                </>
              ) : (
                <>Empty</>
              )}
            </p>
          </div>
        </div>
        <Checkbox
          id={`playlist-item-${playlist.id}`}
          value={playlist.id}
          checked={isChecked}
        />
      </CardContent>
    </Card>
  );
}
export default AddSongPlaylistCard;
