// route  : /api/auth/playlist/[id]   -> GET , PUT

import prisma from "@/libs/prisma";
import { authMiddeware } from "@/middleware/auth";

 


export async function GET(request: Request , { params }: { params: { id: string } }) {
  try {
    const user = await authMiddeware(request);

    const { id } = await params;
    const playlist = await prisma.playlist.findFirst({
      where: {
        userId: user?.id,
        id: Number(id),
      },
      include: {
        songs: true,
      },
    });
    if (!playlist) {
      return new Response(JSON.stringify({ message: "Playlist not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(playlist));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await authMiddeware(request);
    const { playlistName, coverImagePlaylist } = await request.json();
    const { id } = params;

    const updatedPlaylist = await prisma.playlist.update({
      select: {
        id: true,
        name: true,
        coverImage: true,
      },
      where: {
        id: Number(id),
        userId: user?.id,
      },
      data: {
        name: playlistName,
        coverImage: coverImagePlaylist,
      },
    });
    return new Response(
      JSON.stringify({
        message: "Playlist updated successfully",
        playlist: updatedPlaylist,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
}
