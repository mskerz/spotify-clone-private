"use client";

import Image from "next/image";

import { FaPlay as Play, FaStop as Stop } from "react-icons/fa";
import { MdSkipNext as Next, MdPause as Pause, MdSkipPrevious as Previous } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useRedux } from "@/hooks/redux";
import { pauseTrack, stopTrack, togglePlay } from "@/providers/redux/slice/music-player";

import MusicPlayerDisplay from "./MusicPlayerDisplay";
import MusicPlayerProgress from "./MusicPlayerProgress";

export default function MusicPlayerControls() {
  const { useSelector, dispatch } = useRedux();
  const { currentSong, isPlaying } = useSelector((state) => state.musicPlayer);

  const onTogglePlay = () => {
    if (currentSong === null) return;
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(togglePlay());
    }
  };

  const onStop = () => {
    if (currentSong === null) return;
    dispatch(stopTrack());
  };
  return (
    <div className="bg-accent w-full fixed bottom-0 left-0 right-0 py-5">
      <div className="relative flex justify-evenly items-center">
        <div
          aria-hidden="true"
          className="min-w-5"
        />
        <div className="flex items-center     justify-center">
          {currentSong ? (
            <>
              <Image
                src={currentSong.coverImage}
                alt={currentSong.title}
                width={50}
                height={50}
                priority
              />
              <div className="ml-4">
                <p className="text-sm font-semibold">{currentSong.title}</p>
                <p className="text-xs text-gray-400">{currentSong.artist}</p>
              </div>
            </>
          ) : (
            // placeholder
            <div className="flex items-center opacity-0">
              <div className="w-[50px] h-[50px] bg-gray-300 rounded" />
              <div className="ml-4">
                <p className="text-sm font-semibold">Title</p>
                <p className="text-xs text-gray-400">Artist</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <MusicPlayerDisplay
            onTogglePlay={onTogglePlay}
            onStop={onStop}
            isPlaying={isPlaying}
          />
          <MusicPlayerProgress />
        </div>

        <div
          aria-hidden="true"
          className="min-w-[200px]"
        />
      </div>
    </div>
  );
}
