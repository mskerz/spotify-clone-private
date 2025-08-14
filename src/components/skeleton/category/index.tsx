"use client";

import CategoryButtonLoading from "./CategoryButtonLoading";

function CategoriesLoading() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <CategoryButtonLoading key={index} />
      ))}
    </>
  );
}
export default CategoriesLoading;
