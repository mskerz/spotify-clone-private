
import {  useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/auth";

const useRedirect = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const hasRedirected = useRef(false);

  const redirectTo = (
    path: string,
    
    {
      withToast = false,
      delay = 0,
      loadingMsg = "Redirecting...",
      successMsg = "Redirected!",
      errorMsg = "Redirect failed",
    } = {}
  ) => {
    if (withToast) {
      return toast.promise(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            router.replace(path);
            resolve();
          }, delay);
        }),
        {
          loading: loadingMsg,
          success: successMsg,
          error: errorMsg,
        }
      );
    } else {
      setTimeout(() => {
        router.replace(path);
      }, delay);
    }
  };

  return { auth, router, hasRedirected, redirectTo };
};

export default useRedirect;
