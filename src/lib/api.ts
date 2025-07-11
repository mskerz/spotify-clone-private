


// libs/axios.ts
import axios from "axios";
import { auth } from "@/libs/firebase/client";
import { BASE_URL } from "@/constant";

const api =  axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
  
}) 

api.interceptors.request.use(async (config) => {

  if (typeof window === "undefined") return config; // ไม่ทำงานบน server

  const token = await auth.currentUser?.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
   
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);




export default api
 