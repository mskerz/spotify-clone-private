import BackButton from "@/components/button/BackButton";
import { ChildrenProps } from "@/types/props";
import { ChevronsLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params; // await params ก่อน
  return {
    title: `Playlist ${id}`,
  };
}


function PlaylistDetailLayout({ children }: ChildrenProps) {
  return (
    <div className="container flex min-h-screen flex-col items-center sm:mx-auto">
      <div className="flex w-full max-w-2xl items-center justify-between py-5">
        <BackButton />
      </div>
      <div className="flex w-full max-w-2xl flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
export default PlaylistDetailLayout;
