import { Song } from "@prisma/client";

type SonWithCategory = Song & { category: { id: number; name: string } };
type MappedSong = {
  id: number;
  title: string;
  artist: string;
  releaseDate: string;
  category: {
    id: number;
    name: string;
  };
  coverImage: string;
};

function mapSongs(songs: SonWithCategory[]) {
  return songs.map((song) => ({
    id: song.id,
    title: song.title,
    artist: song.artist,
    releaseDate: song.releaseDate,
    category: {
      id: song.categoryId,
      name: song.category.name,
    },
    coverImage: song.coverImage,
  }));
}

export { mapSongs };
