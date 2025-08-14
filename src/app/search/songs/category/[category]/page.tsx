"use client";

import SongItemDropdownMenu from "@/components/dropdown/SongItemDropdownMenu";
import SongCategories from "@/components/list/song/categories/SongCategories";
import { useGetSongsWithCategoryQuery } from "@/libs/rtk/song";
import Image from "next/image";
import { useParams } from "next/navigation";

function SearchSongsWithCategoryPage() {
  const params = useParams(); // { category: 'something' }
  const category = decodeURIComponent(params.category as string);


  return (
    <>

      <ul>
         <SongCategories category={category} />
      </ul>
    </>
  )
}
export default SearchSongsWithCategoryPage