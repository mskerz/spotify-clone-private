// store/index.tsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import songReducer from "../slice/song";
import redirectReducer from "../slice/redirect";
import playlistReducer from "../slice/playlist";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
    redirect: redirectReducer,
    playlist: playlistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
