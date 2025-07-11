import  { Playlist, Song } from "../song";
import { User } from "../user";

type SongState = {
  songs: Song[];
  filteredSongs: Song[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type PlaylistUserState = {
  playlistUsers: Playlist[];
  filteredPlaylistUsers: Playlist[];
  selectedPlaylist: Playlist | null;
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type { SongState , AuthState , PlaylistUserState };
