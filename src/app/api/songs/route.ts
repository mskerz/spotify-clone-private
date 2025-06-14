import prisma from "@/libs/prisma";

export async function GET(req: Request) {
  const songs = await prisma.song.findMany({
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
    category: song.category.name,
    coverImage: song.coverImage,
  }));
  return new Response(JSON.stringify(songResponse));
}

export async function POST(req: Request) {
  try {
    const { title, artist, categoryId, releaseDate, coverImage } =
      await req.json();

    const parsedReleaseDate = new Date(releaseDate);
    await prisma.song.create({
      data: {
        title,
        artist,
        categoryId,
        releaseDate: parsedReleaseDate,
        coverImage,
      },
    });

    return new Response(
      JSON.stringify({ status: 200, message: "Song created successfully" })
    );
  } catch (error) {
    console.error("Error creating song:", error);

    return new Response(
      JSON.stringify({ status: 500, message: "Error creating song" })
    );
  }
}
