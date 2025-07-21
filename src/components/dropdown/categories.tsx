"use client";

import Category from "@/types/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoriesDropdownProps = {
  categories: Category[];
  onChange: (selectedCategoryId: number) => void;
};

function CategoriesDropdown({ categories, onChange }: CategoriesDropdownProps) {
  const handleCategoryChange = (value: string) => {
    const selectedCategoryId = parseInt(value);
    onChange(selectedCategoryId);
  };

  return (
    <Select onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent >
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategoriesDropdown;
