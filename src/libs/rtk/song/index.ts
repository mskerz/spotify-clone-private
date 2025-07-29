import { createApi } from "@reduxjs/toolkit/query/react";
import { id } from "date-fns/locale";

import { ADMIN_API } from "@/constant/api";
import axiosBaseQuery from "@/libs/rtk/axios";
import { Song } from "@/types/song";
import { FormSongType } from "@/validation/admin/song";



export const songApi = createApi({
  reducerPath: "songApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Song"],
  endpoints: (builder) => ({
    getSongs: builder.query<Song[], void>({
      query: () => ({
        url: "/songs",
        method: "GET",
      }),
      providesTags: ["Song"],
    }),
    createSong: builder.mutation<Song, Partial<FormSongType>>({
      query: (song) => ({
        url: ADMIN_API.SONGS,
        method: "POST",
        data: song,
      }),
      invalidatesTags: ["Song"],
    }),

    updateSong: builder.mutation<Song, { id: number; data: Partial<FormSongType> }>({
      query: ({ id, data }) => ({
        url: `${ADMIN_API.SONGS}/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Song"],
    }),


    deleteSong: builder.mutation<Song, number>({
      query: (id) => ({
        url: `${ADMIN_API.SONGS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Song"],
    }),
  }),
});

export const { useGetSongsQuery, useCreateSongMutation, useUpdateSongMutation, useDeleteSongMutation } = songApi;
// CRUD : Create, Read, Update, Delete