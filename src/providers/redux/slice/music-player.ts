import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Song } from "@/types/song";
import { MusicPlayerState } from "@/types/state/music-player";

const initialState: MusicPlayerState = {
  currentSong: null,
  isPlaying: false,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<Song | null>) => {
      state.currentSong = action.payload;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    }
    ,
    stopTrack: (state) => {
      state.isPlaying = false;
      state.currentSong = null;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    }
  },
});

export const { playTrack, pauseTrack, stopTrack, togglePlay } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;

 