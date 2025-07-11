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
                    disconnect: {
                        id: Number(songId)
                    }
                }
            }
        })
        
        return new Response(JSON.stringify({ message: "Song removed from playlist successfully" }), {status: 200});
        
    } catch (error) {
        if(error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
            });
        }
    }
}