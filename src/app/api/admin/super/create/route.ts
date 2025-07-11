import { avartar } from "@/constant";
import { auth } from "@/libs/firebase/server";
import prisma from "@/libs/prisma";
import { superAdminMiddleware } from "@/middleware/auth";

// route  : /api/admin/create ->  POST  : Create admin
export async function POST(request: Request) {
  try {
    const isSuperAdmin = await superAdminMiddleware(request);

    if (!isSuperAdmin) {
      return new Response(
        JSON.stringify({
          message: "Forbidden : You do not have sufficient permissions.",
        }),
        {
          status: 401,
        },
      );
    }
    const { email, password, firstname, lastname, phoneNumber, age } =
      await request.json();
    if (!email || !password || !firstname || !lastname) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
        },
      );
    }
    // 1. สร้าง User ที่ Firebase Auth
    const firebaseUser = await auth.createUser({
      email,
      password,
    });
    const avartarRandom = avartar[Math.floor(Math.random() * avartar.length)];
    await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || "",
        role: "ADMIN",
        userInfo: {
          create: {
            firstName: firstname,
            lastName: lastname,
            avatarUrl: avartarRandom,
            phoneNumber: phoneNumber || "N/A",
            age: parseInt(age) || 18,
          },
        },
      },
    });
    return new Response(
      JSON.stringify({ message: "User Admin created successfully" }),
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Error creating user Admin" }),
      {
        status: 500,
      },
    );
  }
}
