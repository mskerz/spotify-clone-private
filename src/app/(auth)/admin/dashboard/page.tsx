"use client";

import { useEffect } from "react";

import Link from "next/link";

import { BiCategory } from "react-icons/bi";

import { ArrowDown, Music, User } from "lucide-react";

import AdminMenuCard from "@/components/card/AdminMenuCard";
import withAdminGuard from "@/components/guard/withAdminGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/auth";
import { useRegularAdmin } from "@/hooks/auth/admin";

function Page() {
  const { dashboard, fetchDashboardData } = useRegularAdmin();
  const { user, loading } = useAuth().auth;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard: {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"} </h1>
      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            {dashboard.totalUsers === 0 ? (
              <>
                <Skeleton className="h-8 w-8" />
                <Skeleton className="mt-1 h-4 w-36" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{dashboard.totalUsers}</p>

                  <p className="text-muted-foreground text-xs">Users</p>
                </div>
                <p className="text-muted-foreground text-xs">
                  {dashboard.userGrowth > 0 ? (
                    <span className="text-green-400">+{dashboard.userGrowth.toFixed(1)}% from last month</span>
                  ) : dashboard.userGrowth < 0 ? (
                    <span className="text-red-300">
                      <ArrowDown className="inline-block h-4 w-4" /> {Math.abs(dashboard.userGrowth)}% from last month
                    </span>
                  ) : (
                    <span className="text-gray-500">0.0% from last month</span>
                  )}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total Songs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
            <Music className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            {dashboard.totalSongs === 0 ? (
              <>
                {" "}
                <Skeleton className="h-8 w-8" />
                <Skeleton className="mt-1 h-4 w-36" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{dashboard.totalSongs}</p>

                  <p className="text-muted-foreground text-xs">Songs</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <BiCategory className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent className="space-y-1.5">
            {dashboard.totalSongs === 0 ? (
              <>
                {" "}
                <Skeleton className="h-8 w-8" />
                <Skeleton className="mt-1 h-4 w-36" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{dashboard.totalCategories}</p>

                  <p className="text-muted-foreground text-xs">Categories</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <h1 className="text-3xl font-bold">Menu</h1>

      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {user?.role === "SUPER_ADMIN" && (
          <AdminMenuCard
            link="/admin/dashboard/users"
            name="Admins"
          />
        )}

        <AdminMenuCard
          link="/admin/dashboard/songs"
          name="Songs"
        />
        <AdminMenuCard
          link="/admin/dashboard/categories"
          name="Categories"
        />
      </div>
    </div>
  );
}

export default withAdminGuard(Page);
