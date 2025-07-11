import { AddNewPlaylistUser, getPlayListUser,getPlayListbyId } from "@/libs/api/playlist";
import { Playlist } from "@/types/song";
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
})

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

/*
ถ้า จะ render html จาก server มันคงไม่ได้แล้วล่ะ เพราะมันเกี่ยวกับ user 
ที่ต้องแนบ token 

คงต้องใช้วิธี fetch ผ่าน client ใน async thunk 


*/
