import { Song } from "@/types/song";


export interface MusicPlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
  
}