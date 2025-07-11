"use client";

import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import usePlayListForm from "@/hooks/forms/usePlayListForm";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { useRedux } from "@/hooks/redux";
import { playlistActions } from "@/providers/redux/slice/action";

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
      }).catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:bg-accent rounded-full p-2">
        <PlusIcon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Add Playlist</DialogTitle>
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
                  <Input
                    value={form.coverImage}
                    onChange={(e) => setField("coverImage", e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
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
                  onClick={() => setOpen(false)}
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
