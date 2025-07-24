import { auth } from "@/libs/firebase/server";
import prisma from "@/libs/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const { password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "Password and confirm password do not match",
        }),
        {
          status: 400,
        },
      );
    }

    const userForResetPassword = await prisma.user.findFirst({
      where: {
        id: id,
        role: "ADMIN",
      },
    });

    if (!userForResetPassword) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 404,
        },
      );
    }
    await auth.updateUser(userForResetPassword.firebaseUid, {
      password: password,
    });

    // await auth.generatePasswordResetLink(userForResetPassword.email, {
    //   url: "http://localhost:3000/reset-password",
    //   handleCodeInApp: true,
    // })

    return new Response(
      JSON.stringify({
        message: "This admin password has reset successfully",
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
