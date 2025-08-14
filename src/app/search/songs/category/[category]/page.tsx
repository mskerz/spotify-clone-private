"use client";

import { useParams } from "next/navigation";

function SearchSongsWithCategoryPage() {
  const params = useParams(); // { category: 'something' }
  const category = decodeURIComponent(params.category as string);

  return (
    <div> {category}</div>
  )
}
export default SearchSongsWithCategoryPage