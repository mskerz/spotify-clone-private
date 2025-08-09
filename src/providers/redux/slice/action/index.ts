import { createAdminUser, deleteAdminUser, fetchAdmins, fetchDashboard, resetPasswordAdminUser } from "./src/admin";
import { SignIn, SignInWithGoogle, SignUp, checkUserSession, forgotPassword, signOutUser } from "./src/auth";
import {
  AddNewPlaylist,
  addSongToPlaylist,
  getPlaylist,
  getPlaylistById,
  removeSongFromPlaylist,
} from "./src/playlist";

export const authActions = {
  SignIn,
  SignUp,
  checkUserSession,
  signOutUser,
  SignInWithGoogle,
  forgotPassword,
};

export const playlistActions = {
  AddNewPlaylist,
  getPlaylist,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
};

export const adminActions = {
  fetchAdmins,
  fetchDashboard,
  createAdminUser,
  deleteAdminUser,
  resetPasswordAdminUser,
};
