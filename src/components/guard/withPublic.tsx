"use client";
import useAuth from "@/hooks/auth";
import useRedirect from "@/hooks/path";
import { useRedux } from "@/hooks/redux";
import { clearRedirectAfterLogin } from "@/providers/redux/slice/redirect";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// HOC รับ Component แล้ว return Component ใหม่
const withPublic = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithPublic = (props: P) => {
    const { auth, router, redirectTo, hasRedirected } = useRedirect();
    const { dispatch, useSelector } = useRedux();
    const { redirectAfterLogin } = useSelector((state) => state.redirect);

    useEffect(() => {
      if (!auth.isLoggedIn || hasRedirected.current) return;

      hasRedirected.current = true;

      // Redirect only if current path is not a public path ("/login" or "/register")
      redirectTo("/", {
        withToast: !redirectAfterLogin, // ✅ ถ้า *ไม่* ได้มาจาก login ค่อย toast
        delay: 1000,
        loadingMsg: "You are logged in",
      });

      dispatch(clearRedirectAfterLogin());
    }, [auth.isLoggedIn, redirectAfterLogin, redirectTo, dispatch]);

    if (auth.isLoggedIn) return null; // หรือ loading...

    return <WrappedComponent {...props} />;
  };

  return WithPublic;
};

export default withPublic;
