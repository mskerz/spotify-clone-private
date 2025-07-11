import prisma from "@/libs/prisma";
import { authMiddeware } from "@/middleware/auth";


export async function POST(req: Request) {
    try {
         const user = await authMiddeware(req);

        const { playlistId, songId } = await req.json();

        await prisma.playlist.update({
            where: {
                id: Number(playlistId),
                userId: user?.id,
            },
            data: {
                songs: {
                    connect: {
                        id: Number(songId)
                    }
                }
            }
        })
    } catch (error) {
        
    }
}