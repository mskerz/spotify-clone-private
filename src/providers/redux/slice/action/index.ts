import {
  SignIn,
  SignUp,
  checkUserSession,
  signOutUser,
  SignInWithGoogle,
} from "./auth";
import { AddNewPlaylist,getPlaylist, getPlaylistById } from "./playlist";

export const authActions = {
  SignIn,
  SignUp,
  checkUserSession,
  signOutUser,
  SignInWithGoogle,
};

export const playlistActions = {
  AddNewPlaylist,
  getPlaylist,
  getPlaylistById
};
