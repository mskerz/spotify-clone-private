// store/index.tsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import songReducer from "../slice/song";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
