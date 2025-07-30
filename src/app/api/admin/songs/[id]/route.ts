import prisma from "@/libs/prisma";
import { adminMiddleware } from "@/middleware/auth";

type SongParams = {
  params: {
    id: string;
  };
}; 

//  route  : /api/admin/dashboard/songs/:id ->  PUT  : Update song
export async function PUT( req: Request,{  params }: SongParams) {
  try {
    const isAdmin = await adminMiddleware(req);

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ status: 401, message: "Forbidden 401" }),
      );
    }
    const { title, artist, categoryId, releaseDate, coverImage } =  await req.json();
    const { id } = params;
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
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}


//  route  : /api/admin/songs/:id ->  DELETE  : Delete song
export async function DELETE(req: Request, { params }: SongParams) {
    try {
        const isAdmin = await adminMiddleware(req);

        if (!isAdmin) {
            return new Response(
                JSON.stringify({ status: 401, message: "Forbidden 401" }),
            );
        }
        const { id } =  params;
         await prisma.song.delete({
            where: {
                id: Number(id),
            },
        });
        
        return new Response(JSON.stringify({ message: "Song deleted successfully" }),{status: 200});
    } catch (error) {
        if(error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }
    }
}
