import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AdminState } from "@/types/state";

import {
  createAdminUser,
  deleteAdminUser,
  fetchAdmins,
  fetchDashboard,
} from "./action/admin";

const initialState: AdminState = {
  dashboard: {
    totalUsers: 0,
    totalSongs: 0,
    userGrowth: 0,
  },
  admin_users: [],
  loading: false,
  status: "loading",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.admin_users = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // create admin user

      .addCase(createAdminUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.admin_users.push(action.payload);
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload ?? "Failed to create admin user";
      })

      // delete admin user

      .addCase(deleteAdminUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.admin_users = state.admin_users.filter(
          (user) => user.id !== action.payload,
        );
      })
      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload ?? "Failed to delete admin user";
      });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
