"use client";

import { useState } from "react";


import SongsAutocomplete from "@/components/autocomplete/songs";
import SongsWithCategory from "@/components/link/SongsWithCategory";

function SearchPage() {
  const [search, setSearch] = useState("");

  // ฟังก์ชันสำหรับอัพเดต URL ตามคำค้นหา

  // handle input change

  return (
    <div  className="mx-5  lg:mx-0">
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
          onQueryChange={(q) => {
            setSearch(q);
          }}
        />
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <h3 className="text-2xl font-bold">View All</h3>
        <div className="grid grid-cols-3 lg:grid-cols-4  gap-2 t">
          <SongsWithCategory />
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
