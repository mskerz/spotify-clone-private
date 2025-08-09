// app/api/request-reset-password/route.ts
// ใช้ Firebase Admin SDK
import { NextResponse } from "next/server";

import { CLIENT_URL } from "@/constant/api";
import { auth } from "@/libs/firebase/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const link = await auth.generatePasswordResetLink(email, {
      url: `${CLIENT_URL}/reset-password`,
      handleCodeInApp: true,
    });

    return NextResponse. json({ link });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Failed to generate reset link", error: error }, { status: 500 });
  }
}
