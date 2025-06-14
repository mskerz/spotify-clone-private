import prisma from "@/libs/prisma";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany();
    
    return new Response(JSON.stringify(categories));
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error fetching categories:", error.message);
      return new Response("❌ Error fetching categories", { status: 500 });
    }
    console.error("❌ Error fetching categories:", error);
    return new Response("❌ Error fetching categories", { status: 500 });
  }
}
