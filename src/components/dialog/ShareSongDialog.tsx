"use client";

import { useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";
import { FaSpotify } from "react-icons/fa";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from "react-share";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Link } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOpenControl } from "@/hooks/control";
import { ChildrenProps } from "@/types/props";
import { Song } from "@/types/song";

import SongCard from "../card/SongCard";
import { Card, CardContent } from "../ui/card";

interface ShareSongDialogProps extends ChildrenProps {
  song?: Song; // song.title
}

export default function ShareSongDialog({ children, song }: ShareSongDialogProps) {
  const [copied, setCopied] = useState(false);
  const { isOpen, close, setIsOpen } = useOpenControl();

  // สร้าง URL เพลงจากชื่อ
  const songUrl = typeof window !== "undefined" && song?.title ? `${window.location.origin}/song/${song.id}` : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(songUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard.");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        showCloseButton
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p className="text-muted-foreground">Share this song with your friends.</p>

          <Card className="bg-neutral-200">
            <CardContent className="  flex items-center justify-center">
              <div className=" flex max-w-3xs w-full bg-neutral-700 p-4   flex-col items-center gap-4 rounded-md   scale-80   ">
                <Image
                  src={song?.coverImage || ""}
                  alt={song?.title || "Song cover"}
                  width={160}
                  height={160}
                  priority
                  className=" h-auto md:h-60 w-full bg-cover    object-cover rounded-md"
                />
                <div className="flex w-full flex-col text-white  my-2">
                  <p className="  text-xl font-normal">{song?.title}</p>
                  <p className=" "> {song?.artist}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <FaSpotify size={24} />
                    <p>Spotify</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogBody>
        <DialogFooter className="my-2 flex flex-row justify-start">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Copy Link */}
            <div className="flex flex-col items-center">
              <Button
                variant="secondary"
                className=" bg-accent w-13 h-13 flex flex-col items-center gap-2 rounded-full"
                onClick={handleCopy}
              >
                <Link size={48} />
              </Button>
              <p>{copied ? "Copied!" : "Copy"}</p>
            </div>

            {/* Facebook */}
            <FacebookShareButton
              url={songUrl}
              hashtag={`${song?.title} ${song?.artist}`}
            >
              <>
                <FacebookIcon
                  size={48}
                  round
                />
                <p className="mt-2">Post</p>
              </>
            </FacebookShareButton>

            {/* Twitter */}
            <TwitterShareButton
              url={songUrl}
              title={song?.title}
              hashtags={[song?.title, song?.artist].filter(Boolean) as string[]}
            >
              <>
                <XIcon
                  size={48}
                  round
                />
                <p className="mt-2">Tweet</p>
              </>
            </TwitterShareButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
