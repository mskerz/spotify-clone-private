"use client";

import Image from "next/image";

import { FaPlay as Play, FaStop as Stop } from "react-icons/fa";
import { MdSkipNext as Next, MdPause as Pause, MdSkipPrevious as Previous } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useRedux } from "@/hooks/redux";
import { pauseTrack, stopTrack, togglePlay } from "@/providers/redux/slice/music-player";

import MusicPlayerDisplay from "./MusicPlayerDisplay";

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
    <div className="bg-neutral-950 w-full fixed bottom-0 left-0 right-0 py-5">
      <div className="relative flex justify-evenly items-center">
        {currentSong ? (
          <div className="flex items-center  ">
            <Image
              src={currentSong?.coverImage}
              alt={currentSong?.title}
              width={50}
              height={50}
            />
            <div className="ml-4">
              <p className="text-sm font-semibold">{currentSong?.title}</p>
              <p className="text-xs text-gray-400">{currentSong?.artist}</p>
            </div>
          </div>
        ) : (
          <div aria-hidden="true"></div>
        )}

        <div className="flex items-center space-x-4">
          <MusicPlayerDisplay
            onTogglePlay={onTogglePlay}
            onStop={onStop}
            isPlaying={isPlaying}
          />
        </div>
        {/* <div className="flex justify-center space-x-4">
          <Button className="flex items-center rounded-full scale-150 text-gray-300">
            <Previous />
          </Button>
          <Button
            disabled={currentSong === null}
            onClick={() => dispatch(togglePlay())}
            className="flex items-center justify-center rounded-full bg-white hover:bg-white hover:scale-110 text-black cursor-pointer "
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button className="  flex items-center rounded-full scale-150 text-gray-300">
            <Next
              size={20}
              className="w-6 h-6"
            />
          </Button>
          <Button
            onClick={() => dispatch(stopTrack())}
            className="cursor-pointer  flex items-center rounded-full  text-gray-300 hover:text-gray-200"
          >
            <Stop />
          </Button>
        </div> */}

        <div aria-hidden="true"></div>
      </div>
    </div>
  );
}
