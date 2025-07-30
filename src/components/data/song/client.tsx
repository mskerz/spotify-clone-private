"use client";

import { useMemo, useState } from "react";

import CategoriesListButton from "@/components/button/categories";
import { useGetSongsQuery } from "@/libs/rtk/song";
import Category from "@/types/category";

import SongList from "./song";

type SongClientProps = {
  categories: Category[];
};
function SongClient({ categories }: SongClientProps) {
  const { data: songs, error, isLoading } = useGetSongsQuery();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredSongs = useMemo(() => {
    if (filterCategory) {
      return songs?.filter((song) => song.category.name === filterCategory);
    }
    return songs;
  }, [songs, filterCategory]);
  

  // Render
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading songs</div>;

  return (
    <>
      <CategoriesListButton
        categories={categories}
        onCategoryChange={setFilterCategory}
      />
      <SongList songs={filteredSongs!} />
    </>
  );
}
export default SongClient;
