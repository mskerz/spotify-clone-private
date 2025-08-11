"use client";

import { useEffect } from "react";

import { Progress } from "@/components/ui/progress";
import { useRedux } from "@/hooks/redux";
import { tick } from "@/providers/redux/slice/music-player";

function MusicPlayerProgress() {
  const { useSelector, dispatch } = useRedux();
  const { progress, duration, isPlaying } = useSelector((state) => state.musicPlayer);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  // แปลงวินาทีเป็น mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  return (
    <div className="w-full flex items-center gap-2">
      <p> {formatTime(progress)}</p>
      <Progress
        data-slot="progress"
        className="  w-full  lg:w-55  bg-progress-root "
        indicatorClassName="bg-progress-indicator"
        value={progressPercent}
      />
      <p> {formatTime(duration)}</p>
    </div>
  );
}
export default MusicPlayerProgress;
