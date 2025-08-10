"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";
import { FaSpotify } from "react-icons/fa";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from "react-share";

import html2canvas from "html2canvas-pro";
import { DownloadIcon, Link, SaveIcon, X, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOpenControl } from "@/hooks/control";
import { ChildrenProps } from "@/types/props";
import { Song } from "@/types/song";

import { Card, CardContent } from "../ui/card";

// เปลี่ยนเป็น html2canvas-pro

interface ShareSongDialogProps extends ChildrenProps {
  song?: Song; // song.title
}

export default function ShareSongDialog({ children, song }: ShareSongDialogProps) {
  const [copied, setCopied] = useState(false);
  const { isOpen, close, setIsOpen } = useOpenControl();
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      await document.fonts.load("16px Noto Sans Thai");
      await document.fonts.ready;
      const canvas = await html2canvas(cardRef.current, { useCORS: true });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `song_${song?.artist}_${song?.title}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Failed to save image: ", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">Share Song</h1>
              <Button variant="ghost" className="ml-auto rounded-full" onClick={close}>
                <X  className="scale-125" size={50} />
              </Button>
            </div>

          </DialogTitle>
          <DialogDescription>Share this song with your friends.</DialogDescription>
        </DialogHeader>
        <DialogBody>
 
          <Card
            ref={cardRef}
            className="bg-canvas "
          >
            <CardContent className="  flex items-center justify-center">
              <div className=" flex max-w-3xs w-full bg-canvas-content p-4   flex-col items-center gap-4 rounded-md      ">
                <Image
                  src={song?.coverImage || ""}
                  alt={song?.title || "Song cover"}
                  width={160}
                  height={160}
                  priority
                  className=" h-auto md:h-60 w-full bg-cover    object-cover rounded-md"
                />
                <div className="flex w-full flex-col text-canvas-foreground  my-2">
                  <p className="   text-xl ">{song?.title}</p>
                  <p className=" "> {song?.artist}</p>

                  <div className="mt-4 flex   space-x-2 ">
                    <FaSpotify className="mb-1" size={20} />
                    <p className="text-sm align-middle">Spotify</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* ปุ่ม Save อยู่บน Card ด้วย absolute positioning และ z-index สูง */}
          {/* ปุ่มวางแบบ absolute ซ้อนด้านล่าง card */}
          <Button
            onClick={handleSaveImage}
            variant="ghost"
            className="absolute bg-transparent hover:bg-transparent   right-10 bottom-35    mb-2"
          >
            <DownloadIcon className="text-neutral-600" />
          </Button>
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
