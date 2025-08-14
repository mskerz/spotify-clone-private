
import prisma from "@/libs/prisma";
import redis from "@/libs/redis";
import { mapSongs } from "@/utils/map/song";
 

interface CategoryContext {
      params:  Promise<{ name: string }>
}
export async function GET( request: Request,  context: CategoryContext)  {
    try {

        const { name } = await context.params;
        const cachedSongs = await redis.get("songs_with_category");

        const decodedCategory = decodeURIComponent(name);

        if (cachedSongs) {
            const parsedSongs = JSON.parse(cachedSongs);
            return new Response(JSON.stringify(parsedSongs));
        }
        const SongWithCategory = await prisma.song.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                category: {
                    name: decodedCategory,
                },
            },
        });

        const songsResponse = mapSongs(SongWithCategory);
        await redis.set("songs_with_category", JSON.stringify(songsResponse));

        
        return new Response(JSON.stringify(songsResponse));
         
    } catch (error) {

        if(error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
        
    }
    
}