"use client";

import Category from "@/types/category";

 
type CategoriesDropdownProps = {
  categories: Category[]
  onChange: (selectedCategoryId: number) => void
}

function CategoriesDropdown( {categories , onChange}: CategoriesDropdownProps) {

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value);
    onChange(selectedCategoryId);
  }
  return (
         <select
            id="category"
            name="category"
            className="w-full bg-[#282828] border border-[#333] rounded-md text-white px-4 py-3"
             
            onChange={handleCategoryChange}
        >
            {categories.map((category) => (
               <option key={category.id} value={category.id}>
                  {category.name}                                       
               </option>
            ))}
         </select>
  )
}
export default CategoriesDropdown;
