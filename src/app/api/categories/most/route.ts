import prisma from "@/libs/prisma";
import redis from "@/libs/redis";

export async function GET() {
  try {
    const cachedCategories = await redis.get("mostCategories");

    if (cachedCategories) {
      const parsedCategories = JSON.parse(cachedCategories);
      return Response.json(parsedCategories);
    }
    const mostCategories = await prisma.category.findMany({
      orderBy: {
        songs: {
          _count: "desc",
        },
      },
      take: 6,
    });

    await redis.set("mostCategories", JSON.stringify(mostCategories));

    return Response.json(mostCategories);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
}
