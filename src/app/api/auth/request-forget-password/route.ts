
// app/api/request-reset-password/route.ts

import { CLIENT_URL } from "@/constant/api";
import { auth } from "@/libs/firebase/server"; // ใช้ Firebase Admin SDK
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const link = await auth.generatePasswordResetLink(email, {
      url:  `${CLIENT_URL}/reset-password`,
      handleCodeInApp: true,
    });

    return NextResponse.json({
      message: "Password reset link generated",
      link, // สำหรับ dev หรือใช้ในระบบส่งอีเมลจริงก็ได้
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Failed to generate reset link", error:  error },
      { status: 500 }
    );
  }
}
