import prisma from "@/libs/prisma";
import redis from "@/libs/redis";
import { mapSongs } from "@/utils/map/song";

interface CategoryContext {
  params: Promise<{ name: string }>;
}
export async function GET(_: Request, context: CategoryContext) {
  try {
    const { name } = await context.params;

    const decodedCategory = decodeURIComponent(name);
    const redisKey = `songs_with_category:${decodedCategory}`;

    const cachedSongs = await redis.get(redisKey);

    if (cachedSongs) {
      const parsedSongs = JSON.parse(cachedSongs);
      return new Response(JSON.stringify(parsedSongs));
    }
    const SongWithCategory = await prisma.song.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        category: {
          name: decodedCategory,
        },
      },
    });

    const songsResponse = mapSongs(SongWithCategory);
    await redis.set(redisKey, JSON.stringify(songsResponse), {
      expiration: {
        type: "EX",
        value: 60,
      },
    });

    return new Response(JSON.stringify(songsResponse));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
  }
}
