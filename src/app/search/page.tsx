"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import SongsAutocomplete from "@/components/autocomplete/songs";
import { useGetCategoriesQuery } from "@/libs/rtk/category";
import { cn } from "@/libs/utils";

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

function SearchPage() {
 
  const [search, setSearch] = useState("");
  const { data: categories } = useGetCategoriesQuery();

 

  // ฟังก์ชันสำหรับอัพเดต URL ตามคำค้นหา
 
  // handle input change
 
  return (
    <>
      <div className="relative  ">
        {/* <Input
          type="text"
          value={search}
          onChange={onChange}
          placeholder="Search..."
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2  cursor-pointer hover:bg-inherit"
          tabIndex={-1}
        >
          <Search className="h-6 w-6" />
        </Button> */}

        <SongsAutocomplete
          query={search}
          onQueryChange={(q)=>{
            setSearch(q);
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">View All</h3>
        <div className="grid grid-cols-3 lg:grid-cols-4  gap-2 t">
          {categories?.map((category, index) => (
            <Link
              href={`/search/songs/category/${category.name}`}
              key={category.id}
              className={cn(
                "p-8  rounded-3xl  text-white transition-colors duration-300",
                colors[index % colors.length],
              )}
            >
              <span className="text-xl"> {category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default SearchPage;
