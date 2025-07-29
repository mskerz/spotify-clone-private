import { AUTH_API } from "@/constant/api";
import api from "@/libs/axios";
import {
  AddNewPlaylistUser,
  getPlayListUser,
  getPlayListbyId,
} from "@/libs/api/playlist";
import { Playlist, Song } from "@/types/song";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPlaylist = createAsyncThunk<
  Playlist[],
  void,
  { rejectValue: string }
>("playlist/get", async (_, { rejectWithValue }) => {
  try {
    const response = await getPlayListUser();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});
export const getPlaylistById = createAsyncThunk<
  Playlist,
  number,
  { rejectValue: string }
>("playlist/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await getPlayListbyId(id.toString());
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const AddNewPlaylist = createAsyncThunk<
  Playlist,
  { name: string; coverImage: string },
  { rejectValue: string }
>("playlist/add", async (body, { rejectWithValue }) => {
  try {
    const response = await AddNewPlaylistUser({
      playlistName: body.name,
      coverImagePlaylist: body.coverImage,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const addSongToPlaylist = createAsyncThunk<
  Song,
  { playlistId: number; songId: number },
  { rejectValue: string }
>("playlist/addSong", async (body, { rejectWithValue }) => {
  try {
    const response = await api.post(`${AUTH_API.ADD_SONG_TO_PLAYLIST}`, {
      playlistId: body.playlistId,
      songId: body.songId,
    });
    return response.data.song;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const removeSongFromPlaylist = createAsyncThunk<
  number,
  { playlistId: number; songId: number },
  { rejectValue: string }
>("playlist/removeSong", async (body, { rejectWithValue }) => {
  try {
    const response = await api.post(`${AUTH_API.REMOVE_SONG_FROM_PLAYLIST}`, {
      playlistId: body.playlistId,
      songId: body.songId,
    });
    return response.data.songId;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});
