import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";

import api from "@/libs/axios";

// your axios instance

const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
  }> =>
  async ({ url, method, data, params }) => {
    console.log(`[API CALL] ${method} ${url} at ${new Date().toISOString()}`);

    try {
      const result = await api({ url, method, data, params, headers: { "Content-Type": "application/json" } });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
