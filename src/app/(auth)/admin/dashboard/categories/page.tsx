"use client";

import { useRedux } from "@/hooks/redux";
import { getCategory } from "@/libs/api/category";
import { useGetCategoriesQuery } from "@/libs/rtk/category";

import columns from "./column";
import { DataTable } from "./data-table";

function Page() {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      {/* Additional content can be added here */}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={categories || []}
        />
      </div>
    </>
  );
}
export default Page;
