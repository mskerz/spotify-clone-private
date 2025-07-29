"use client";

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Category from "@/types/category";

type CategoriesDropdownProps = {
  categories: Category[];
  selectedId?: number;
  onChange: (selectedCategoryId: number) => void;
};

function CategoriesDropdown({ categories, selectedId, onChange }: CategoriesDropdownProps) {
  const handleCategoryChange = (value: string) => {
    const selectedCategoryId = parseInt(value);
    onChange(selectedCategoryId);
  };

  return (
    <Select
      value= {selectedId?.toString()}
      onValueChange={(value) => handleCategoryChange(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id.toString()}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategoriesDropdown;
