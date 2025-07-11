import Link from "next/link";
import Image from "next/image";
import { getSongs } from "@/libs/api/song";
import { getCategory } from "@/libs/api/category";
import CategoriesListButton from "@/components/button/categories";
import { SongClient } from "@/components/data/song";
import { Metadata } from "next";
import { FaPlus } from "react-icons/fa";
 
 

export default async function Home() {
  const songs = await getSongs();
  const categories = await getCategory();
  return (
    <>
      <div className="flex flex-col space-y-3 ">
        {/* ฟอร์มเพิ่มเพลง */}
         
        <CategoriesListButton categories={categories} />
        <SongClient initialSongs={songs} />
      </div>
    </>
  );
}
