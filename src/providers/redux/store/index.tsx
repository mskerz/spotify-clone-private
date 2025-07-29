// store/index.tsx
import { configureStore } from "@reduxjs/toolkit";

import { categoryApi } from "@/libs/rtk/category";
// Ensure to import the admin reducer
import { songApi } from "@/libs/rtk/song";

import adminReducer from "../slice/admin";
import authReducer from "../slice/auth";
import playlistReducer from "../slice/playlist";
import redirectReducer from "../slice/redirect";
import songReducer from "../slice/song";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
    redirect: redirectReducer,
    playlist: playlistReducer,
    admin: adminReducer, // Ensure to import and add the admin reducer
    [songApi.reducerPath]: songApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songApi.middleware, categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
