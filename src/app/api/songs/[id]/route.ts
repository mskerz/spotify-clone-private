import prisma from "@/libs/prisma";
import redis from "@/libs/redis";
import { mapSong } from "@/utils/map/song";

interface SongContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: SongContext) {
  try {
    const { id } = await context.params;

    const redisKey = `song:${id}`;

    const cachedSong = await redis.get(redisKey);

    if (cachedSong) {
      const parsedSong = JSON.parse(cachedSong);
      return new Response(JSON.stringify(parsedSong));
    }

    const song = await prisma.song.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const songResponse = mapSong(song!);

    await redis.set(redisKey, JSON.stringify(songResponse));
    return new Response(JSON.stringify(songResponse));
  } catch (error) {

    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
  }
}
