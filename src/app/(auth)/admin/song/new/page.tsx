import { SongForm } from "@/components/form";
import { getCategory } from "@/libs/api/category";

async function page() {
  const categories = await getCategory();
  return <SongForm categories={categories} />;
}
export default page;
