"use client";
import useRedirect from "@/hooks/path";
import { useEffect } from "react";

// HOC รับ Component แล้ว return Component ใหม่
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAuth = (props: P) => {
    const { auth, router, redirectTo, hasRedirected } = useRedirect();

    useEffect(() => {
      if (!auth.isLoggedIn && !hasRedirected.current) {
        hasRedirected.current = true;
        redirectTo("/login",{
          withToast: true,
          delay: 1000,
          loadingMsg: "You are not logged in",
        });
      }
    }, [auth, router]);

    if (!auth.isLoggedIn) return null; // หรือ loading...

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
