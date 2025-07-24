import { useRedux } from "@/hooks/redux";

import { getCategory } from "@/libs/api/category";
import { DataTable } from "./data-table";
import { columns } from "./column";
 

async function Page() {
  const categories = await getCategory();
  return (
    <>
    
      {/* Additional content can be added here */}
      <div className="container mx-auto py-10">
        
        <DataTable columns={columns} data={categories} />
        
      </div>
    </>
  );
}
export default Page;
