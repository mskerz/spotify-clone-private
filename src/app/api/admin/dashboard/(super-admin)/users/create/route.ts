import { fakerTH } from "@faker-js/faker";

import { avartar } from "@/constant";
import { auth } from "@/libs/firebase/server";
import prisma from "@/libs/prisma";
import { superAdminMiddleware } from "@/middleware/auth";
import { calculateAge } from "@/utils/calculate";
import { mapAdminResponse } from "@/utils/map";

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
    const { email, password, firstName, lastName } = await request.json();
    if (!email || !password || !firstName || !lastName) {
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
    const avartarRandom = fakerTH.image.avatar();
    const randomPhone = fakerTH.phone.number({ style: "national" });
    const randomBirthday = fakerTH.date.birthdate();
    const age = calculateAge(randomBirthday);

    // ก่อนสร้าง admin
    const adminCount = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });

    const newAdmin = await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || "",
        provider: "LOCAL",
        role: "ADMIN",
        userInfo: {
          create: {
            firstName: firstName,
            lastName: lastName,
            avatarUrl: avartarRandom,
            phoneNumber: randomPhone,
            age: age,
            birthday: randomBirthday,
          },
        },
      },
      include: {
        userInfo: true,
      },
    });

    const mapppedNewAdmin = mapAdminResponse(newAdmin, adminCount + 1);
    return new Response(
      JSON.stringify({
        message: "User Admin created successfully",
        newAdmin: mapppedNewAdmin,
      }),
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
