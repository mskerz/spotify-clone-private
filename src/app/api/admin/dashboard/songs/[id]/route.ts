import prisma from "@/libs/prisma";
import { adminMiddleware } from "@/middleware/auth";
import { Song } from "@/types/song";

type SongParams = {
  params: Promise<{ id: string }>;
};

//  route  : /api/admin/dashboard/songs/:id ->  PUT  : Update song
export async function PUT(req: Request, context: SongParams) {
  try {
    const isAdmin = await adminMiddleware(req);

    if (!isAdmin) {
      return new Response(JSON.stringify({ status: 401, message: "Forbidden 401" }));
    }
    const { title, artist, categoryId, releaseDate, coverImage } = await req.json();
    const { id } = await context.params;
    const updateSong = await prisma.song.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        artist,
        categoryId,
        releaseDate,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updateSong));
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}

//  route  : /api/admin/dashboard/songs/:id ->  DELETE  : Delete song
export async function DELETE(req: Request, context: SongParams) {
  try {
    const isAdmin = await adminMiddleware(req);

    if (!isAdmin) {
      return new Response(JSON.stringify({ status: 401, message: "Forbidden 401" }));
    }
    const { id } = await context.params;
    await prisma.song.delete({
      where: {
        id: Number(id),
      },
    });

    return new Response(JSON.stringify({ message: "Song deleted successfully" }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
