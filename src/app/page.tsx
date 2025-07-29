import CategoriesListButton from "@/components/button/categories";
import { SongClient } from "@/components/data/song";
import { SongClientWrapper } from "@/components/wrapper";
import { getCategory } from "@/libs/api/category";
import { useGetSongsQuery } from "@/libs/rtk/song";

export default async function HomePage() {
  const categories = await getCategory();
  // ssr fetch
  return (
    <>
      <div className="flex flex-col space-y-3 ">
        {/* ฟอร์มเพิ่มเพลง */}

         <SongClient categories={categories} />
      </div>
    </>
  );
}
