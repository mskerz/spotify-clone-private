"use client";

import { filterCategorySongs, getAll } from "@/providers/redux/slice/song";
import Category from "@/types/category";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
 
function CategoriesListButton({ categories }: { categories: Category[] }) {
    const [activeId, setActiveId] = useState<number | null>(null);
    const dispatch = useDispatch();

    const handleCategoryChange = (category: string) => {
         dispatch(filterCategorySongs(category))
    }

    const handleAll = () => {
        dispatch(getAll());
    }
    return (
        <div className="m-4 flex justify-center">
            <Button
                className={`${
                    activeId === null
                            ? "bg-gray-800"
                            : "bg-green-500 hover:bg-[#1fdf64]"
                } text-white font-medium   py-4 px-6 rounded-full shadow-md transition-colors mr-2`}
                onClick={() => {
                    setActiveId(null);
                    handleAll();
                }}
            >
                All
            </Button>
            {categories.map((category) => (
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
