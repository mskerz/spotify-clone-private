
import prisma from "@/libs/prisma";
import { UserWithInfo } from "@/types/user/prisma";
import { authMiddeware } from "@/middleware/auth";
import { mapUserResponse } from "@/utils/map";

export async function GET(request: Request) {
  try {
    const user = await authMiddeware(request);
    
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const user_response = mapUserResponse(user);
    return new Response(JSON.stringify({ user: user_response }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
   
  }
}
