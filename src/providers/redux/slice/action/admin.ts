import { createAsyncThunk } from "@reduxjs/toolkit";

import { ADMIN_API } from "@/constant";
import api from "@/lib/api";
import { getAdmins } from "@/libs/api/admin";
import { Dashbooard } from "@/types/dashboard";
import { AdminUser } from "@/types/user";
import { AdminFormInput, AdminResetPassword } from "@/validation/admin";
import { FormRegisterType } from "@/validation/register";

export const fetchDashboard = createAsyncThunk<
  Dashbooard,
  void,
  { rejectValue: string }
>("admin/fetchDashboard", async (_, { rejectWithValue }) => {
  try {
    // Simulate an API call to fetch dashboard data
    const response = await api.get(ADMIN_API.DASHBOARD);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const fetchAdmins = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>("admin/fetchAdmins", async (_, { rejectWithValue }) => {
  try {
    const response = await getAdmins();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const createAdminUser = createAsyncThunk<
  AdminUser,
  AdminFormInput,
  { rejectValue: string }
>("admin/createAdminUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post(ADMIN_API.ADMIN_USERS_CREATE, formData);
    return response.data.newAdmin;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message!);
    }
    return rejectWithValue("Unknown error");
  }
});

export const resetPasswordAdminUser = createAsyncThunk<
  string,
  AdminResetPassword,
  { rejectValue: string }
>("admin/resetPasswordAdminUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post(
      `${ADMIN_API.ADMIN_USERS_RESET_PASSWORD}/${formData.id}`,
      formData,
    );
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const deleteAdminUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteAdminUser", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${ADMIN_API.ADMIN_USERS_DELETE}/${id}`);
    return response.data.deletedUserId;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});
