import prisma from "@/libs/prisma";
import { adminMiddleware } from "@/middleware/auth";

type CategoryProps = {
  params: Promise<{ id: string }>;
};

//  route  : /api/admin/dashboard/categories/:id ->  PUT  : Update category
export async function PUT(req: Request, context: CategoryProps) {
  try {
    const admin = await adminMiddleware(req);

    if (!admin) {
      return new Response(JSON.stringify({ status: 403, message: "Unauthorized" }), {
        status: 403,
      });
    }
    const { id } = await context.params;
    const { name } = await req.json();

    await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ status: 200, message: "Category updated successfully" }));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}

//  route  : /api/admin/dashboard/categories/:id ->  DELETE  : Delete category

export async function DELETE(req: Request, context: CategoryProps) {
  try {
    const admin = await adminMiddleware(req);

    const { id } = await context.params;
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    if (!admin) {
      return new Response(JSON.stringify({ status: 401, message: "Unauthorized" }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify({ status: 200, message: "Category deleted successfully" }));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
