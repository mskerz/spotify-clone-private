import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Song } from "@/types/song";
import { MusicPlayerState } from "@/types/state/music-player";


function getRandomDurationSeconds() {
  const min = 2.5 * 60; // 150 วินาที
  const max = 4 * 60;   // 240 วินาที
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const initialState: MusicPlayerState = {
  currentSong: null,
  isPlaying: false,
  progress: 0,
  duration: 0
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<Song | null>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
      state.duration = getRandomDurationSeconds();
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    }
    ,
    stopTrack: (state) => {
      state.isPlaying = false;
      state.currentSong = null;
      state.progress = 0;
      state.duration = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    tick:(state)=>{
        if(state.isPlaying && state.currentSong !== null){
            state.progress += 1;
            if(state.progress >= state.duration){
                state.progress = 0;
                state.isPlaying = false;
            }
        }
    }
  },
});

export const { playTrack, pauseTrack, stopTrack, togglePlay, tick } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;

 