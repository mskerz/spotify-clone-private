"use client";

import { Button } from "@/components/ui/button";
import { useRedux } from "@/hooks/redux";


import { FaPlay as Play, FaStop as Stop } from "react-icons/fa";
import { MdSkipNext as Next, MdPause as Pause, MdSkipPrevious as Previous } from "react-icons/md";

type PlayerDisplayProps = {
    onTogglePlay?: () => void;
    onStop?: () => void;
    isPlaying?: boolean
};

function MusicPlayerDisplay( {onTogglePlay ,onStop ,isPlaying=false}: PlayerDisplayProps) {
  return <div className="flex justify-center space-x-4">
            <Button className="flex items-center rounded-full scale-150 text-gray-300">
              <Previous />
            </Button>
            <Button
                onClick={()=>onTogglePlay?.()}
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
              onClick={() => onStop?.()}
              className="cursor-pointer  flex items-center rounded-full  text-gray-300 hover:text-gray-200"
            >
              <Stop />
            </Button>
          </div>;
}
export default MusicPlayerDisplay;
