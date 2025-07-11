import AddPlaylistDialog from "@/components/dialog/AddPlaylist";
import { ChildrenProps } from "@/types/props";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection",
};
function layout({ children }: ChildrenProps) {
  return (
    <div className="container flex min-h-screen flex-col items-center sm:mx-auto">
      <div className="flex w-full max-w-2xl items-center justify-center py-5">
        <h1 className="text-2xl font-bold">Your Collection</h1>
        <div className="ml-auto gap-3">
          <button className="hover:bg-accent rounded-full p-2">
            <SearchIcon className="h-6 w-6" />
          </button>
          <AddPlaylistDialog />
        </div>
      </div>
      <div className="flex w-full max-w-2xl flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
export default layout;
