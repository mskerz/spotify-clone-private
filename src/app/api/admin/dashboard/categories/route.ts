import prisma from "@/libs/prisma";
import { adminMiddleware } from "@/middleware/auth";

export async function POST(req: Request) {
  try {
    const admin = await adminMiddleware(req);

    if (!admin) {
      return new Response(JSON.stringify({ status: 401, message: "Unauthorized" }));
    }

    const { name } = await req.json();

    await prisma.category.create({
      data: {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ status: 200, message: "Category created successfully" }));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
  }
}
