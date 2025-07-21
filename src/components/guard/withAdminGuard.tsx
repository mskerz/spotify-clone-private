"use client";
import useRedirect from "@/hooks/path";
import { useEffect } from "react";

const withAdminGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminGuard = (props: P) => {
    const { auth, router, redirectTo, hasRedirected } = useRedirect();

    const user = auth.user;

    const isAuthReady = auth.isLoggedIn && user !== undefined;

    useEffect(() => {
      if (isAuthReady && !hasRedirected.current) {
        const isAdmin =
          user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

        if (!isAdmin) {
          hasRedirected.current = true;
          redirectTo("/", {
            withToast: true,
            delay: 500,
            loadingMsg: "You are not authorized to access this page",
          });
        }
      }
    }, [isAuthReady, user, redirectTo, hasRedirected]);

    if (!isAuthReady) {
      return null; // หรือ loading component เช่น <Spinner />
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminGuard;
};

export default withAdminGuard;
