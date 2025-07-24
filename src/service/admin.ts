import prisma from "@/libs/prisma";
import { startOfMonth, subMonths } from "date-fns";

export async function getAdminDashboard() {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));

  const totalUsers = await prisma.user.count({
    where: { role: { notIn: ["ADMIN", "SUPER_ADMIN"] } },
  });

  const usersThisMonth = await prisma.user.count({
    where: {
      role: { notIn: ["ADMIN", "SUPER_ADMIN"] },
      createdAt: { gte: thisMonthStart },
    },
  });

  const usersLastMonth = await prisma.user.count({
    where: {
      role: { notIn: ["ADMIN", "SUPER_ADMIN"] },
      createdAt: { gte: lastMonthStart, lte: thisMonthStart },
    },
  });

  const userGrowth =
    usersLastMonth === 0
      ? null
      : ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;

  const totalSongs = await prisma.song.count();

  const totalCategories = await prisma.category.count();

  return {
    totalUsers,
    totalSongs,
    totalCategories,
    userGrowth: userGrowth !== null ? parseFloat(userGrowth.toFixed(2)) : 0.0,
  };
}
 