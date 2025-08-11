"use client";

import { FaPlay as Play, FaStop as Stop } from "react-icons/fa";
import { MdSkipNext as Next, MdPause as Pause, MdSkipPrevious as Previous } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useRedux } from "@/hooks/redux";

type PlayerDisplayProps = {
  onTogglePlay?: () => void;
  onStop?: () => void;
  isPlaying?: boolean;
};

function MusicPlayerDisplay({ onTogglePlay, onStop, isPlaying = false }: PlayerDisplayProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant={"ghost"}
        className="flex items-center rounded-full scale-150 text-primary"
      >
        <Previous />
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => onTogglePlay?.()}
        className="flex items-center justify-center  rounded-full w-15 h-15  scale-60        button-player   hover:scale-65  cursor-pointer "
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>

      <Button
        variant={"ghost"}
        className="  flex items-center rounded-full scale-150 text-primary"
      >
        <Next
          size={20}
          className="w-6 h-6"
        />
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => onStop?.()}
        className="cursor-pointer  flex items-center rounded-full  text-primary"
      >
        <Stop />
      </Button>
    </div>
  );
}
export default MusicPlayerDisplay;
