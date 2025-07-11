"use client";
import { Skeleton } from "@/components/ui/skeleton";

function PlaylistLoadingColumn() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4 rounded-2xl py-3">
          <Skeleton className="ml-4 h-20 w-20 rounded object-cover" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </>
  );
}
export default PlaylistLoadingColumn;
