import { joinCategory } from "@/constant/prisma";
import prisma from "@/libs/prisma";
import { authMiddeware } from "@/middleware/auth";

export async function POST(req: Request) {
  try {
    const user = await authMiddeware(req);

    const { playlistId, songId } = await req.json();

    // 1. เพิ่ม song เข้า playlist
    await prisma.playlist.update({
      where: {
        id: Number(playlistId),
        userId: user?.id,
      },
      data: {
        songs: {
          connect: {
            id: Number(songId),
          },
        },
      },
    });

 

    const songAdded = await prisma.song.findUnique({
      where: {
        id: Number(songId),
      },
      select: {
        id: true,
        title: true,
        artist: true,
        coverImage: true,
        category: joinCategory,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Song added to playlist successfully",
        song: songAdded,
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
}
