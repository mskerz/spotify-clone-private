"use client";

import SongListItem from "@/components/card/SongListItem";
import { SongsListSkeleton } from "@/components/skeleton/song/SongListLoading";
import { useGetSongsWithCategoryQuery } from "@/libs/rtk/song";

interface SongCategoriesProps {
  category: string;
}

function SongCategories({ category }: SongCategoriesProps) {
  const { data: songs , isLoading , } = useGetSongsWithCategoryQuery({ name: category });
   if(isLoading) return <SongsListSkeleton />;
   if(songs?.length === 0) return <p className="text-center text-lg font-medium text-gray-400">No songs available.</p>;
  return (
    <>
      {songs?.map((song) => (
        <SongListItem
          key={song.id}
          song={song}
        />
      ))}
    </>
  );
}
export default SongCategories;
