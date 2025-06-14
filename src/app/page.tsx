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
      <div className="flex flex-col">
        {/* ฟอร์มเพิ่มเพลง */}
        <div className="mt-10 mb-8 flex justify-center">
          <Link
            href="/song"
            className="bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold py-2 px-6 rounded-full shadow-md transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center"><FaPlus  color="white" /></div>
              <span>Add Song</span>

            </div>
          </Link>
        </div>
        <CategoriesListButton categories={categories} />
        <SongClient initialSongs={songs} />
      </div>
    </>
  );
}
