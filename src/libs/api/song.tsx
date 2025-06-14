import Song from "@/types/song";

async function getSongs(): Promise<Song[]> {
  try {
    const res = await fetch("http://localhost:3000/api/songs", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching songs:", error);
    return [];
  }
}

async function insertSong(song: {
  title: string;
  artist: string;
  categoryId: number;
  releaseDate: string;
  coverImage: string;
}) {
  try {
    const res = await fetch("http://localhost:3000/api/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
    const data = await res.json(); 
   console.log(data);
   
    return data;
  } catch (error) {
    console.error(" Error inserting song:", error);
    return [];
  }
}
 
export { insertSong , getSongs };
 