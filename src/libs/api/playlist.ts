import { AUTH_API } from "@/constant";
import api from "@/lib/api";
import { Playlist } from "@/types/song";

async function getPlayListUser(): Promise<Playlist[]> {
  try {
    const response = await api.get(AUTH_API.PLAYLIST_BASE_URL);
    const playlist = await response.data;
    return playlist;
  } catch (error) {
     return [];
  }
}

async function getPlayListbyId(id: string): Promise<Playlist> {
  try {
    const response = await api.get(`${AUTH_API.PLAYLIST_BASE_URL}/${id}`);
    const playlist = await response.data;
    return playlist;
  } catch (error) {
     if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

async function AddNewPlaylistUser(body: {
  playlistName: string;
  coverImagePlaylist: string;
}): Promise<Playlist> {
  try {
    const response = await api.post(AUTH_API.PLAYLIST_BASE_URL, body);
    const playlist = await response.data;
    return playlist;
  } catch (error) {
    throw new Error("Error creating playlist");
  }
}

export { getPlayListUser, getPlayListbyId, AddNewPlaylistUser };
