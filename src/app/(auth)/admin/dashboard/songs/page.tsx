import { useRedux } from "@/hooks/redux";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getSongs } from "@/libs/api/song";

async function Page() {
  const songs = await getSongs();
  return (
    <>
    
      {/* Additional content can be added here */}
      <div className="container mx-auto py-10">
        
        <DataTable columns={columns} data={songs} />
      </div>
    </>
  );
}
export default Page;
