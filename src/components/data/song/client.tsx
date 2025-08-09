"use client";

import { useMemo, useState } from "react";

import CategoriesListButton from "@/components/button/categories";
import { useGetSongsQuery } from "@/libs/rtk/song";
import Category from "@/types/category";

import SongList from "./song";
import SongLoading from "@/components/skeleton/song";


function SongClient() {
  const { data: songs, error, isLoading } = useGetSongsQuery();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredSongs = useMemo(() => {
    if (filterCategory) {
      return songs?.filter((song) => song.category.name === filterCategory);
    }
    return songs;
  }, [songs, filterCategory]);


  // Render 
  if (isLoading) return <SongLoading />;
  if (error) return <div>Error loading songs</div>;

  return (
    <>
      <CategoriesListButton
       
        onCategoryChange={setFilterCategory}
      />
      <SongList songs={filteredSongs!} />
    </>
  );
}
export default SongClient;
