"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {useRegularAdmin} from "@/hooks/auth/admin";
import { User, Music, ArrowDown } from "lucide-react";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/auth";
import Link from "next/link";
import withAdminGuard from "@/components/guard/withAdminGuard";

function Page() {
  const { dashboard, fetchDashboardData } = useRegularAdmin();
  const {user, loading} = useAuth().auth;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  return (
    <div className="space-y-6 p-6">
      
      <h1 className="text-3xl font-bold">{user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"} Dashboard</h1>
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
                <div className="text-2xl font-bold">{dashboard.totalUsers}</div>
                <p className="text-muted-foreground text-xs">
                  {dashboard.userGrowth > 0 ? (
                    <span className="text-green-400">
                      +{dashboard.userGrowth.toFixed(1)}% from last month
                    </span>
                  ) : dashboard.userGrowth < 0 ? (
                    <span className="text-red-300">
                      <ArrowDown className="inline-block h-4 w-4" />{" "}
                      {Math.abs(dashboard.userGrowth)}% from last month
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
                <div className="text-2xl font-bold">{dashboard.totalSongs}</div>
                <p className="text-muted-foreground text-xs">
                  +8.3% from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <h1 className="text-3xl font-bold">Menu</h1>

      <Separator />
      <div className="flex w-full gap-4">
        {user?.role === "SUPER_ADMIN" && (
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-all">
                <Link href="/admin/dashboard/users">View admin users</Link>
              </CardDescription>
            </CardHeader>
            
          </Card>
        )}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Songs</CardTitle>
            <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-all">
                <Link href="/admin/dashboard/songs">View songs</Link>
              </CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-all">
                <Link href="/admin/dashboard/categories">View categories</Link>
              </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default withAdminGuard(Page);
