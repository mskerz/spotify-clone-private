"use client";

import Link from "next/link";

import { useGetCategoriesQuery } from "@/libs/rtk/category";
import { cn } from "@/libs/utils";
import CategoriesLoading from "../skeleton/category";

const colors = [
  "bg-red-600 hover:bg-red-700",
  "bg-green-600 hover:bg-green-700",
  "bg-blue-600 hover:bg-blue-700",
  "bg-yellow-600 hover:bg-yellow-700",
  "bg-purple-600 hover:bg-purple-700",
  "bg-pink-600 hover:bg-pink-700",
  "bg-indigo-600 hover:bg-indigo-700",
  "bg-teal-600 hover:bg-teal-700",
];

function SongsWithCategory() {
  const { data: categories , isLoading } = useGetCategoriesQuery();
  if (isLoading) return <CategoriesLoading />;
  return (
    <>
      {categories?.map((category, index) => (
        <Link
          href={`/search/songs/category/${category.name}`}
          key={category.id}
          className={cn("p-8  rounded-3xl  text-white transition-colors duration-300", colors[index % colors.length])}
        >
          <span className="text-md text-center"> {category.name}</span>
        </Link>
      ))}
    </>
  );
}
export default SongsWithCategory;
