"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddSong } from "@/hooks/useSongForm";
import { insertSong } from "@/libs/api/song";
import Category from "@/types/category";

import CategoriesDropdown from "../dropdown/categories";

function SongForm({ categories }: { categories: Category[] }) {
  const { title, setTitle, artist, setArtist, categoryId, setCategoryId, releaseDate, setReleaseDate, coverImage, setCoverImage, reset } = useAddSong();
  const router = useRouter();

  const onAddSong = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const song = { title, artist, categoryId, releaseDate, coverImage };
      const response = await insertSong(song);
      if (response.status === 200) {
        reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl shadow-lg border-0 ">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold">Add New Song</CardTitle>
          <p className="mt-2">Fill in the details to add a new song to spotify</p>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={onAddSong} className="space-y-6">
            {/* Song Title */}
            <div className="space-y-2">
              <Label htmlFor="songName" className="text-sm font-medium">
                Song Title
              </Label>
              <Input id="songName" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter song title" required />
            </div>

            {/* Artist */}
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium">
                Artist
              </Label>
              <Input id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Enter artist name" required />
            </div>

            {/* Category and Release Date - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <CategoriesDropdown categories={categories} onChange={setCategoryId} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseDate" className="text-sm font-medium">
                  Release Date
                </Label>
                <Input id="releaseDate" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-3">
              <Label htmlFor="coverImage" className="text-sm font-medium">
                Cover Image URL
              </Label>

              {coverImage && (
                <div className="flex justify-center">
                  <div className="relative overflow-hidden rounded-lg border-2 shadow-md">
                    <Image src={coverImage} alt="Cover Image Preview" width={200} height={200} className="object-cover" loading="lazy" />
                  </div>
                </div>
              )}

              <Input id="coverImage" type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Paste image URL (e.g., https://example.com/image.jpg)" required />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full button-spotify font-semibold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-95">
                Insert Song
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SongForm;
