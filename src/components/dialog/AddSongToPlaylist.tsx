"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import toast from "react-hot-toast";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/auth";
import usePlaylist from "@/hooks/auth/playlist";
import { useOpenControl } from "@/hooks/control";
import { useRedux } from "@/hooks/redux";
import { playlistActions } from "@/providers/redux/slice/action";
import OpenControl from "@/types/state/control";

import AddSongPlaylistCard from "../card/AddSongPlaylistCard";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

type AddSongProps = {
  songId: number;
  children: React.ReactNode;
  control?: OpenControl;
};

function AddSongToPlaylist({ songId, control, children }: AddSongProps) {
  const { dispatch } = useRedux();

  const { playlists, status } = usePlaylist();
  const [checkboxValue, setCheckboxValue] = useState<{
    [key: string]: boolean;
  }>({});

 
  const playlistwithThisSong = playlists.filter((playlist) =>
    playlist.songs.some((song) => song.id === songId),
  );

  const playlistWithoutThisSong = playlists.filter((playlist) =>
    playlist.songs.every((song) => song.id !== songId),
  );

  const handleCheckboxChange = (playlistId: number) => {
    setCheckboxValue((prevValue) => ({
      ...prevValue,
      [playlistId]: !prevValue[playlistId],
    }));
  };

  const handleSaveAll = () => {
    const selectedPlaylists = Object.entries(checkboxValue)
      .filter(([id, isChecked]) => {
        const playlistId = Number(id);
        const isNotInPlaylist =  !playlistwithThisSong.some(
          (playlist) => playlist.id === playlistId,
        );

        return isChecked && isNotInPlaylist;
      })
      .map(([playlistId]) => Number(playlistId));

    if (selectedPlaylists.length === 0) {
      toast. error("Please select at least one playlist.");
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

    control?.close();
  };
  return (
    <Dialog open={control?.isOpen} onOpenChange={control?.setIsOpen}>
      <DialogTrigger asChild>{children || "Add"}</DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogCancel />
          <DialogTitle>Add to Playlist</DialogTitle>
          <div aria-hidden="true" />
        </DialogHeader>
        <DialogBody>
          {}
          {playlistwithThisSong.length !== 0 && (
            <>
              <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
                <p className="text-muted-foreground text-sm">Saved</p>

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
              <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
                <p className="text-muted-foreground text-sm">Save to</p>

                {playlistWithoutThisSong.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No playlist available.
                  </p>
                ) : (
                  playlistWithoutThisSong.map((playlist) => (
                    <AddSongPlaylistCard
                      key={playlist.id}
                      playlist={playlist}
                      onClick={handleCheckboxChange}
                      isChecked={
                        checkboxValue.hasOwnProperty(playlist.id)
                          ? checkboxValue[playlist.id]
                          : false
                      }
                    />
                  ))
                )}
              </div>
            </>
          )}
        </DialogBody>
        <CardFooter className="flex flex-row items-center justify-between overflow-auto">
          { playlistWithoutThisSong.length !== 0 && playlists.length !== 0 ? (
            <Button
              className="button-spotify w-full cursor-pointer rounded-full transition-all"
              onClick={handleSaveAll}
            >
              Complete
            </Button>
          ) : (
            <Button className="button-spotify w-full cursor-pointer rounded-full transition-all">
              <Link href="/account/playlists"> Create New Playlist</Link>
            </Button>
          )}
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AddSongToPlaylist;

export const DialogCancel = ({ ...props }) => (
  <DialogClose
    className="text-foreground/80 hover:text-foreground cursor-pointer transition-all"
    {...props}
  >
    Cancel
  </DialogClose>
);



// วันนี้ทำอะไรไปบ้าง 24 /7 /2025
/* 
     - แก้ไข logic การกรอง playlistWithThisSong และ playlistWithoutThisSong
  - แก้ปัญหา checkboxValue ไม่รีเซ็ตเมื่อ songId เปลี่ยน
  - แยก control สำหรับแต่ละเพลง เพื่อให้ Dialog ทำงานอิสระกัน
  - แก้ไข handleSaveAll ให้ตรวจสอบ playlist ที่ยังไม่มีเพลงนี้จริงๆ ก่อนเพิ่ม
  - ตรวจสอบและแก้ไข toast error กรณีไม่เลือก playlist
  - เพิ่ม function random playlist 



*/