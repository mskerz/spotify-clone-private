import prisma from "@/libs/prisma";
import { adminMiddleware } from "@/middleware/auth";

// route  : /api/admin/dashboard/songs ->  POST  : Create song
export async function POST(req: Request) {
  try {
    const admin = await adminMiddleware(req);

    if (!admin) {
      return new Response(JSON.stringify({ status: 401, message: "Unauthorized" }));
    }

    const { title, artist, categoryId, releaseDate, coverImage } = await req.json();

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

    return new Response(JSON.stringify({ status: 200, message: "Song created successfully" }));
  } catch (error) {
    console.error("Error creating song:", error);

    return new Response(JSON.stringify({ status: 500, message: "Error creating song" }));
  }
}
