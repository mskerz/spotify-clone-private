export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playlist_name, description } = body;

    


    return new Response(JSON.stringify({ message: "Playlist created successfully" }), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
