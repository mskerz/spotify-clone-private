import { UserWithInfo } from "@/types/user/prisma";
import { auth } from "../libs/firebase/server";
import prisma from "@/libs/prisma";
import { mapFirebaseProvider } from "@/utils/map";
import { DecodedIdToken } from "node_modules/firebase-admin/lib/auth/token-verifier";
import { faker } from "@faker-js/faker";

export async function authMiddeware(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const DecodeUser = await auth.verifyIdToken(token);
   
    return getUser(DecodeUser);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getUser(DecodeUser: DecodedIdToken) {
  try {
    const provider = DecodeUser.firebase.sign_in_provider;

    let user: UserWithInfo | null = await prisma.user.findUnique({
      where: { firebaseUid: DecodeUser.uid },
      include: { userInfo: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: DecodeUser.uid,
          email: DecodeUser.email || "",
          role: "USER",
          provider: mapFirebaseProvider(provider),
          userInfo: {
            create: {
              firstName: DecodeUser.name?.split(" ")[0] || "",
              lastName: DecodeUser.name?.split(" ").slice(1).join(" ") || "",
              avatarUrl: DecodeUser.picture || faker.image.avatar(),
              phoneNumber: "N/A",
              age: 18, // Provide a default age or extract from decodeUser if available
            },
          },
        },
        include: { userInfo: true },
      });
    }
     return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}


export async function adminMiddleware(req: Request) {
  const user = await authMiddeware(req);
  return user?.role === "ADMIN"|| user?.role === "SUPER_ADMIN";
}


export async function superAdminMiddleware(req: Request) {
  const user = await authMiddeware(req);
  return user?.role === "SUPER_ADMIN";
}