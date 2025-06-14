import { auth } from "@/libs/firebase/server";
import { mapFirebaseProvider, mapUserResponse, randomAvatar } from "@/utils/map";
import prisma from "@/libs/prisma";
import { UserWithInfo } from "@/types/user/prisma";

export async function GET(request: Request) {
  try {
    const header = request.headers.get("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const token = header.split(" ")[1];
    const decodeUser = await auth.verifyIdToken(token);
    const provider = decodeUser.firebase.sign_in_provider;
    let user: UserWithInfo | null = await prisma.user.findUnique({
      where: { firebaseUid: decodeUser.uid },
      include: { userInfo: true },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: decodeUser.uid,
          email: decodeUser.email || "",
          role: "USER",
          provider: mapFirebaseProvider(provider),
          userInfo: {
            create: {
              firstName: decodeUser.name?.split(" ")[0] || "",
              lastName: decodeUser.name?.split(" ").slice(1).join(" ") || "",
              avatarUrl: decodeUser.picture || randomAvatar(),
              phoneNumnber: "N/A",
              age: 18, // Provide a default age or extract from decodeUser if available
            },
          },
        },
        include: { userInfo: true },
      });
    }

    if (!user.userInfo) {
      return new Response(JSON.stringify({ message: "User info not found" }), {
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
    return new Response(JSON.stringify({ message: "Error syncing user" }), {
      status: 500,
    });
  }
}
