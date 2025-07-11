import { Playlist } from "@/types/song";
import { PlaylistUserState } from "@/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewPlaylist, getPlaylist, getPlaylistById } from "./action/playlist";

const initState: PlaylistUserState = {
  playlistUsers: [],
  filteredPlaylistUsers: [],
  selectedPlaylist: null,
  loading: false,
  status: "idle",
  error: null,
};

const playlistUserSlice = createSlice({
  name: "playlistuser",
  initialState: initState,
  reducers: {
    setPlayListUsers: (state, action: PayloadAction<Playlist[]>) => {
      state.playlistUsers = action.payload;
      state.filteredPlaylistUsers = action.payload;
      state.loading = false;
      state.status = "succeeded";
      state.error = null;
    },

    getDetailPlaylistById: (state, action: PayloadAction<number>) => {
      state.selectedPlaylist =
        state.playlistUsers.find((playlist) => playlist.id === action.payload) ?? null;
    },

    clearDetailPlaylist: (state) => {
      state.selectedPlaylist = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(
        getPlaylist.fulfilled,
        (state, action: PayloadAction<Playlist[]>) => {
          state.loading = false;
          state.playlistUsers = action.payload;
          state.filteredPlaylistUsers = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(getPlaylist.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(
        getPlaylistById.fulfilled,
        (state, action: PayloadAction<Playlist>) => {
          state.loading = false;
          state.status = "succeeded";
          state.selectedPlaylist = action.payload;
        },
      )
      .addCase(getPlaylistById.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })

      // add playlist
      .addCase(AddNewPlaylist.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(
        AddNewPlaylist.fulfilled,
        (state, action: PayloadAction<Playlist>) => {
          state.loading = false;
          state.playlistUsers.push(action.payload);
          state.filteredPlaylistUsers?.push(action.payload);
          state.status = "succeeded";
        },
      )
      .addCase(AddNewPlaylist.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      });
  },
});

export const { setPlayListUsers,getDetailPlaylistById , clearDetailPlaylist } = playlistUserSlice.actions;

export default playlistUserSlice.reducer;
