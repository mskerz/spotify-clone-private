import prisma from "@/libs/prisma";
import { authMiddeware } from "@/middleware/auth";

// route  : /api/auth/playlist -> GET
export async function GET(req: Request) {
  try {
    const user = await authMiddeware(req);
    const userPlaylist = await prisma.playlist.findMany({
      select: {
        id: true,
        name: true,
        coverImage: true,
        songs: true,
      },
      where: { userId: user?.id },
      
    });

   
 

    return new Response(JSON.stringify(userPlaylist));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}

// route  : /api/auth/playlist ->  POST
export async function POST(req: Request) {
  try {
    const user = await authMiddeware(req);
    if (!user?.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: User ID missing" }),
        { status: 401 },
      );
    }
    const { playlistName, coverImagePlaylist } = await req.json();
    const playlist = await prisma.playlist.create({
      select: {
        id: true,
        name: true,
        coverImage: true,
      },
      data: {
        name: playlistName,
        coverImage: coverImagePlaylist,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(playlist));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
