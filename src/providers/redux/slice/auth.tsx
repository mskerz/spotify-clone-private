import { AuthState } from "@/types/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SignIn,
  SignUp,
  checkUserSession,
  signOutUser,
  SignInWithGoogle,
} from "./action/auth";
import { User } from "@/types/user";

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(SignUp.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(
        SignUp.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.status = "failed";
          state.error = action.payload ?? "Signup failed";
        },
      )
      //login
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(SignIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(
        SignIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.status = "failed";
          state.error = action.payload ?? "Login failed";
        },
      )
      .addCase(checkUserSession.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        
      })
      .addCase(
        checkUserSession.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.status = "succeeded";

          if (action.payload) state.isLoggedIn = true;
          state.user = action.payload;
        },
      )
      .addCase(
        checkUserSession.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.status = "failed";
          state.error = action.payload ?? "Login failed";
        },
      ).addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.user = null;
      }).addCase(signOutUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })
      .addCase(SignInWithGoogle.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(SignInWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
      }).addCase(SignInWithGoogle.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })
      
      ;
  },
});

export default authSlice.reducer;
