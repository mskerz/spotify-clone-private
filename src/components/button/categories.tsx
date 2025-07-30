"use client";

import { useState } from "react";


import Category from "@/types/category";

import { Button } from "../ui/button";
import { useGetCategoriesQuery } from "@/libs/rtk/category";

type CategoriesListButtonProps = {
  
  onCategoryChange: (categoryName: string | null) => void;
};
function CategoriesListButton({
  
  onCategoryChange,
}: CategoriesListButtonProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { data: categories  } = useGetCategoriesQuery();

  const handleCategoryChange = (category: string | null) => {
    onCategoryChange(category);
  };

  return (
    <div className="m-4 flex justify-center">
      <Button
        className={`${
          activeId === null ? "bg-gray-800" : "bg-green-500 hover:bg-[#1fdf64]"
        } text-white font-medium   py-4 px-6 rounded-full shadow-md transition-colors mr-2`}
        onClick={() => {
          setActiveId(null);
          handleCategoryChange(null);
        }}
      >
        All
      </Button>
      {categories && categories.map((category) => (
        <Button
          key={category.id}
          className={`${
            activeId === category.id
              ? "bg-gray-800"
              : "bg-green-500 hover:bg-[#1fdf64]"
          } text-white font-medium py-2 px-6 rounded-full shadow-md transition-all mr-2`}
          onClick={() => {
            setActiveId(category.id);
            handleCategoryChange(category.name);
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
export default CategoriesListButton;
