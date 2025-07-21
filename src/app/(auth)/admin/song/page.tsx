import { useRedux } from "@/hooks/redux";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getSongs } from "@/libs/api/song";

async function Page() {
  const songs = await getSongs();
  return (
    <div>
      <h1 className="text-3xl font-bold">Song Management</h1>
      <p className="text-muted-foreground">Manage your songs here.</p>
      {/* Additional content can be added here */}
      <div className="container mx-auto py-10">
        
        <DataTable columns={columns} data={songs} />
      </div>
    </div>
  );
}
export default Page;
