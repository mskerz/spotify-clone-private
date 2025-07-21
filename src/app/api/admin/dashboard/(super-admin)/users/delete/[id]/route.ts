import { auth } from "@/libs/firebase/server";
import prisma from "@/libs/prisma";
import { superAdminMiddleware } from "@/middleware/auth";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const isSuperAdmin = await superAdminMiddleware(req);

    if (!isSuperAdmin) {
      return new Response(
        JSON.stringify({
          message: "Forbidden: You don't have sufficient permissions.",
        }),
        {
          status: 403, // เปลี่ยนเป็น 403 Forbidden
        },
      );
    }

    const { id } = await context.params;

    console.log("Deleting admin with ID:", id);

    const adminToDelete = await prisma.user.findUnique({
      where: { id:id },
      select: {  id: true, firebaseUid: true },
    });

    console.log("Admin to delete:", adminToDelete);

    if (!adminToDelete) {
      return new Response(
        JSON.stringify({ message: "Admin not found or not an admin" }),
        { status: 404 },
      );
    }

    await auth.deleteUser(adminToDelete.firebaseUid);

    await prisma.user.delete({
      where: {
        id: adminToDelete.id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Admin deleted successfully",
        deletedUserId: id,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);

      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
      status: 500,
    });
  }
}
