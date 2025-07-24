import { adminMiddleware } from "@/middleware/auth";
import prisma from "@/libs/prisma";
import { startOfMonth, subMonths } from "date-fns";
import { getAdminDashboard } from "@/service/admin";

export async function GET(req: Request) {
  try {
    const admin = await adminMiddleware(req);
    if (!admin) {
      return new Response(
        JSON.stringify({ status: 403, message: "Forbidden Permission" }),
      );
    }

    const { totalUsers, totalSongs, userGrowth,totalCategories } = await getAdminDashboard();

    return new Response(
      JSON.stringify({
        totalUsers,
        totalSongs,
        totalCategories,
        userGrowth:
          userGrowth !== null ? parseFloat(userGrowth.toFixed(2)) : 0.0,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
