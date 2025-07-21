"use client";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePlaylist from "@/hooks/auth/playlist";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "../ui/card";
import useAuth from "@/hooks/auth";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRedux } from "@/hooks/redux";
import { playlistActions } from "@/providers/redux/slice/action";
import toast from "react-hot-toast";
import AddSongPlaylistCard from "../card/AddSongPlaylistCard";

type AddSongProps = {
  songId: number;
  children: React.ReactNode;
};

function AddSongToPlaylist({ songId, children }: AddSongProps) {
  const { dispatch } = useRedux();

  const { playlists, status } = usePlaylist();
  const [checkboxValue, setCheckboxValue] = useState<{
    [key: string]: boolean;
  }>({});

  const playlistwithThisSong = playlists.filter((playlist) =>
    playlist.songs.some((song) => song.id === songId),
  );

  const playlistWithoutThisSong = playlists.filter(
    (playlist) => !playlist.songs.some((song) => song.id === songId),
  );

  const handleCheckboxChange = (playlistId: number) => {
    setCheckboxValue((prevValue) => ({
      ...prevValue,
      [playlistId]: !prevValue[playlistId],
    }));
  };

  const handleSaveAll = () => {
    const selectedPlaylists = Object.entries(checkboxValue)
      .filter(([_, isChecked]) => isChecked)
      .map(([playlistId]) => Number(playlistId));

    if (selectedPlaylists.length === 0) {
      toast.error("Please select at least one playlist.");
      return;
    }
    const promise = Promise.all(
      selectedPlaylists.map((playlistId) =>
        dispatch(
          playlistActions.addSongToPlaylist({
            playlistId,
            songId,
          }),
        ),
      ),
    );

    toast.promise(promise, {
      loading: "Adding song to playlist...",
      success: "Song added to selected playlists!",
      error: "Failed to add song to some playlists.",
    });
  };
  return (
    <Dialog>
      <DialogTrigger>{children || "Add"}</DialogTrigger>

      <DialogContent showCloseButton={false} > 
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogCancel />
          <DialogTitle>Add to Playlist</DialogTitle>
          <div aria-hidden="true" />
        </DialogHeader>
        <DialogBody>
          {playlistwithThisSong.length !== 0 && (
            <>
              <p className="text-muted-foreground text-sm">Saved</p>
              <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
                {playlistwithThisSong.map((playlist) => (
                  <AddSongPlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={handleCheckboxChange}
                    isChecked={
                      checkboxValue.hasOwnProperty(playlist.id)
                        ? checkboxValue[playlist.id]
                        : true // เพราะมีเพลงนี้อยู่แล้ว
                    }
                  />
                ))}
              </div>
            </>
          )}

          <Separator />
          {playlistWithoutThisSong && (
            <>
              <p className="text-muted-foreground text-sm">Save to</p>
              <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
                {playlistWithoutThisSong.map((playlist) => (
                  <AddSongPlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={handleCheckboxChange}
                  />
                ))}
              </div>
            </>
          )}
        </DialogBody>
        <CardFooter className="flex flex-row items-center justify-between overflow-auto">
          <Button
            className="button-spotify w-full cursor-pointer rounded-full transition-all"
            onClick={handleSaveAll}
          >
            Complete
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AddSongToPlaylist;

export const DialogCancel = ({ ...props }) => (
  <DialogClose className="text-foreground/80 hover:text-foreground cursor-pointer transition-all" {...props}>
    Cancel
  </DialogClose>
);
