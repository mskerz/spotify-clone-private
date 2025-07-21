import prisma from "@/libs/prisma";
import { superAdminMiddleware } from "@/middleware/auth";
import { mapAdminResponse } from "@/utils/map";

export async function GET(request: Request) {
  try {
    const isSuperAdmin = await superAdminMiddleware(request);

    if (!isSuperAdmin) {
      return new Response(
        JSON.stringify({
          message: "Forbidden : You don't have sufficient permissions.",
        }),
        {
          status: 404,
        },
      );
    }

    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      include: {
        userInfo: true,
      },
    });

const admin_users = admins.map((admin,index)=>mapAdminResponse(admin,index+1));
    return new Response(
      JSON.stringify({
        admins: admin_users,
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
