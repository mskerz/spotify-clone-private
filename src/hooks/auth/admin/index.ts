import useAuth from "..";

import { useCallback } from "react";

import { useRedux } from "@/hooks/redux";
import { adminActions } from "@/providers/redux/slice/action";

function useBaseAdmin() {
  const { dispatch, useSelector } = useRedux();
  const {
    auth: { isLoggedIn, user },
  } = useAuth();
  const { dashboard, admin_users, loading, status, error } = useSelector(
    (state) => state.admin,
  );

  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isAnyAdmin = isAdmin || isSuperAdmin;

  return {
    dispatch,
    isLoggedIn,
    user,
    admin_users,
    isSuperAdmin,
    isAnyAdmin,
    dashboard,
    loading,
    status,
    error,
  };
}

export function useRegularAdmin() {
  const baseAdmin = useBaseAdmin();
  const {
    dashboard,
    isLoggedIn,
    isAnyAdmin,
    loading,
    status,
    error,
    dispatch,
  } = baseAdmin;

  const fetchDashboardData = useCallback(() => {
    if (!isLoggedIn || !isAnyAdmin) return;
    dispatch(adminActions.fetchDashboard());
  }, [dispatch, isLoggedIn, isAnyAdmin]);

  return {
    ...baseAdmin,
    fetchDashboardData,
  };
}

export function useSuperAdmin() {
  const baseAdmin = useBaseAdmin();
  const {
    dashboard,
    isLoggedIn,
    isSuperAdmin,
    loading,
    status,
    error,
    dispatch,
  } = baseAdmin;

  const fetchAdminsData = useCallback(() => {
    if (!isLoggedIn || !isSuperAdmin) return;
    dispatch(adminActions.fetchAdmins());
  }, [dispatch, isLoggedIn, isSuperAdmin]);

  const deleteAdmin = useCallback(
    (id: string) => {
      if (!isLoggedIn || !isSuperAdmin) return;
      dispatch(adminActions.deleteAdminUser(id));
    },
    [dispatch, isLoggedIn, isSuperAdmin],
  );
  return {
    ...baseAdmin,
    fetchAdminsData,
    deleteAdmin,
  };
}
