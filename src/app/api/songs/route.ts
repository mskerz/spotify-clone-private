import prisma from "@/libs/prisma";

export async function GET(req: Request) {
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
    category:  {
      id: song.categoryId,
      name: song.category.name
    },
    coverImage: song.coverImage,
    
  }));
  return new Response(JSON.stringify(songResponse));
}
