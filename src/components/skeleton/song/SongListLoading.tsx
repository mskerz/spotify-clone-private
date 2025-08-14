import { Skeleton } from "@/components/ui/skeleton";

function SongItemSkeleton() {
  return (
    <div className="my-2 flex items-center justify-between rounded-md p-2">
      <div className="flex items-center">
        <Skeleton className="h-[50px] w-[50px] rounded" />
        <div className="ml-4 space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
}

export function SongsListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, idx) => (
        <SongItemSkeleton key={idx} />
      ))}
    </div>
  );
}
