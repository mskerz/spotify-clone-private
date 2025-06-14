import { PayloadAction } from "@reduxjs/toolkit";
import { SongState } from "@/types/state";
import { createSlice } from "@reduxjs/toolkit";
import Song from "@/types/song";

const initialState: SongState = {
  songs: [],
  filteredSongs: [],
  loading: false,
  status: "idle",
  error: null,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.filteredSongs = action.payload;
      state.loading = false;
      state.status = "succeeded";
      state.error = null;
    },

    filterCategorySongs: (state, action: PayloadAction<string>) => {
      state.filteredSongs = state.songs.filter((song) => song.category === action.payload);
    },
    getAll: (state) => {
      state.filteredSongs = state.songs;
    },
    setLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setSongs , filterCategorySongs, getAll , setLoading, setError } = songSlice.actions;

export default songSlice.reducer;
