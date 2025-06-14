"use client";

import Category from "@/types/category";
import CategoriesDropdown from "../dropdown/categories";
import { useAddSong } from "@/hook/useSongForm";
import { insertSong } from "@/libs/api/song";
import { useRouter } from "next/navigation";
import Image from "next/image";

function SongForm({ categories }: { categories: Category[] }) {
  const {
    title,
    setTitle,
    artist,
    setArtist,
    categoryId,
    setCategoryId,
    releaseDate,
    setReleaseDate,
    coverImage,
    setCoverImage,
    reset,
  } = useAddSong();
  const navigate = useRouter();

  const onAddSong = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const song = {
        title,
        artist,
        categoryId,
        releaseDate,
        coverImage,
      };

      const response = await insertSong(song);
      if (response.status === 200) {
        reset();
        navigate.push("/");
      }
    } catch (error) {
      console.error("❌ Error adding song:", error);
    }
  };
  return (
   <form
  onSubmit={onAddSong}
  className="mt-10 flex flex-col justify-center gap-6 w-full max-w-4xl mx-auto bg-[#121212] p-8 rounded-3xl shadow-lg border border-[#282828]"
>
  <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wide">
    เพิ่มเพลงใหม่
  </h2>

  <div>
    <label
      htmlFor="songName"
      className="block mb-2 text-sm font-semibold text-[#B3B3B3]"
    >
      ชื่อเพลง
    </label>
    <input
      type="text"
      id="songName"
      name="songName"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full bg-[#282828] border border-[#333] rounded-md px-4 py-3 text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      placeholder="กรอกชื่อเพลง"
      required
    />
  </div>

  <div>
    <label
      htmlFor="artist"
      className="block mb-2 text-sm font-semibold text-[#B3B3B3]"
    >
      ศิลปิน
    </label>
    <input
      type="text"
      id="artist"
      name="artist"
      value={artist}
      onChange={(e) => setArtist(e.target.value)}
      className="w-full bg-[#282828] border border-[#333] rounded-md px-4 py-3 text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      placeholder="กรอกชื่อศิลปิน"
      required
    />
  </div>

  <div>
    <label
      htmlFor="category"
      className="block mb-2 text-sm font-semibold text-[#B3B3B3]"
    >
      หมวดหมู่
    </label>
    <CategoriesDropdown
      categories={categories}
      onChange={setCategoryId}
      
    />
  </div>

  <div>
    <label
      htmlFor="releaseDate"
      className="block mb-2 text-sm font-semibold text-[#B3B3B3]"
    >
      วันที่เผยแพร่
    </label>
    <input
      type="date"
      id="releaseDate"
      name="releaseDate"
      value={releaseDate}
      onChange={(e) => setReleaseDate(e.target.value)}
      className="w-full bg-[#282828] border border-[#333] rounded-md px-4 py-3 text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      required
    />
  </div>

  <div>
    <label
      htmlFor="cover"
      className="block mb-2 text-sm font-semibold text-[#B3B3B3]"
    >
      รูปปกเพลง
    </label>
    {coverImage && (
      <Image
        src={coverImage}
        alt="Cover"
        width={200}
        height={200}
        loading="lazy"
        className="my-4 rounded-md shadow-lg  outline-2 outline-[#1DB954]"
      />
    )}
    <input
      type="text"
      id="cover"
      name="cover"
      value={coverImage}
      onChange={(e) => setCoverImage(e.target.value)}
      className="w-full bg-[#282828] border border-[#333] rounded-md px-4 py-3 text-white placeholder-[#565656] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      placeholder="ลิงก์รูปปกเพลง"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-[#1DB954] hover:bg-[#1ed760cc] transition text-black font-semibold rounded-full py-3 mt-4 shadow-lg"
  >
    เพิ่มเพลง
  </button>
</form>

  );
}
export default SongForm;
