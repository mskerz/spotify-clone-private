import { SongForm } from "@/components/form";
import {  getCategory } from "@/libs/api/category";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Song",
};
async function page() {
    const categories = await getCategory();
  return (
    <div className="flex flex-col">
      <SongForm categories={categories} />
    </div>
  );
}
export default page;
