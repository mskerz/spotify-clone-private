import prisma from "@/libs/prisma";
import redis from "@/libs/redis";

export async function GET(req: Request) {
  try {
    const cachedSongs = await redis.get("songs");

    if (cachedSongs) {
      const parsedSongs = JSON.parse(cachedSongs);
      return new Response(JSON.stringify(parsedSongs));
    }


    const songs = await prisma.song.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const songResponse = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      releaseDate: song.releaseDate,
      category: {
        id: song.categoryId,
        name: song.category.name,
      },
      coverImage: song.coverImage,
    }));


    await redis.set("songs", JSON.stringify(songResponse));
    
    return new Response(JSON.stringify(songResponse));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
