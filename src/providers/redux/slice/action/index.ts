import { createAdminUser, deleteAdminUser, fetchAdmins, fetchDashboard, resetPasswordAdminUser } from "./admin";
import {
  SignIn,
  SignUp,
  checkUserSession,
  signOutUser,
  SignInWithGoogle,
} from "./auth";
import { AddNewPlaylist,addSongToPlaylist,getPlaylist, getPlaylistById, removeSongFromPlaylist } from "./playlist";

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
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist
};

export const adminActions = {
  fetchAdmins,
  fetchDashboard,
  createAdminUser,
  deleteAdminUser,
  resetPasswordAdminUser
};
