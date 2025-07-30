"use client";

import { useGetSongsQuery } from "@/libs/rtk/song";

import { columns } from "./columns";
import { DataTable } from "./data-table";

function Page() {
  const { data: songs } = useGetSongsQuery();
  return (
    <>
      {/* Additional content can be added here */}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={songs || []}
        />
      </div>
    </>
  );
}
export default Page;
