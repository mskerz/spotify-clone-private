import { HttpClient } from "./http";
import { auth } from "@/libs/firebase/client";

async function getFirebaseIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
}

const api  = new HttpClient();


api.addRequestInterceptor(async (input, init) => {
  const token = await getFirebaseIdToken();
  if (token) {
    const headers = new Headers(init?.headers || {});
    headers.set("Authorization", `Bearer ${token}`);
    return [input, { ...init, headers }];
  }
  return [input, init];
});

// Example: Add a response interceptor
api.addResponseInterceptor(async (response) => {
  if (!response.ok) {
    // Handle errors globally
    console.error("Fetch error:", response.status);
  }
  return response;
});

export default api;