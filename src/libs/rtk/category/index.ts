import { createApi } from "@reduxjs/toolkit/query/react";

import { ADMIN_API } from "@/constant/api";
import axiosBaseQuery from "@/libs/rtk/axios";
import Category from "@/types/category";
import { CategoryFormType } from "@/validation/admin/category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createNewCategory: builder.mutation<Category, Partial<CategoryFormType>>({
      query: (category) => ({
        url: ADMIN_API.CATEGORIES,
        method: "POST",
        data: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<Category, { id: number; data: Partial<CategoryFormType> }>({
      query: ({ id, data }) => ({
        url: `${ADMIN_API.CATEGORIES}/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<Category, number>({
      query: (id) => ({
        url: `${ADMIN_API.CATEGORIES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
