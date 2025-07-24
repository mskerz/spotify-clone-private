"use client";

import { useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import { faker } from "@faker-js/faker";
import { PlusIcon, ShuffleIcon } from "lucide-react";

import usePlayListForm from "@/hooks/forms/usePlayListForm";
import { useRedux } from "@/hooks/redux";
import { playlistActions } from "@/providers/redux/slice/action";
import { random } from "@/utils/random";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AddPlaylistDialog() {
  const { form, setField, reset, isFormEmpty } = usePlayListForm();
  const [open, setOpen] = useState(false); // 👈 เพิ่ม state เพื่อควบคุม Dialog
  const { dispatch } = useRedux();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormEmpty) {
      toast("Please fill in all required fields.", {
        icon: "⚠️",
        style: {
          borderRadius: "15px",
          background: "#212121",
          color: "#fff",
        },
      });
      return;
    }

    dispatch(playlistActions.AddNewPlaylist(form))
      .unwrap()
      .then(() => {
        toast.success("Playlist added successfully.");
        reset();
        setOpen(false); // 👈 ปิด Dialog แบบ custom
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const randomCreatePlaylist = () => {
    const randomName = random.generateWordPhrase();
    const randomImage = random.generateImage();
    setField("name", randomName);
    setField("coverImage", randomImage);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:bg-accent rounded-full p-2">
        <PlusIcon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="h-auto" onEscapeKeyDown={() => reset()}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Create Playlist
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Add a playlist to your collection.
          </DialogDescription>
          <div className="mt-4">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="PlaylistName">Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Playlist Name"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="coverImage">CoverImage</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={form.coverImage}
                      onChange={(e) => setField("coverImage", e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <Button
                      variant={"secondary"}
                      type="button"
                      className="cursor-pointer"
                      onClick={randomCreatePlaylist}
                    >
                      <ShuffleIcon className="h-6 w-6" /> Random
                    </Button>
                  </div>
                  {form.coverImage && (
                    <div className="mt-4">
                      <Image
                        src={form.coverImage}
                        onError={(e) => {
                          e.currentTarget.src = "/fallback-image.jpg";
                        }}
                        alt="coverImage"
                        className="rounded-md object-cover"
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant={"secondary"}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
