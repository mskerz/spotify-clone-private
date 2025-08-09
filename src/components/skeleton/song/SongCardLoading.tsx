
"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SongCardLoading() {
  return (
    <div className="flex max-w-3xs w-full flex-col items-center gap-4 scale-85 transition-all duration-200 ease-in-out opacity-80">
      {/* รูป cover loading skeleton */}
      <Skeleton className="w-full h-40 rounded-md" />

      {/* ข้อมูลชื่อเพลงและศิลปิน */}
      <div className="flex w-full flex-col my-2 space-y-2">
        {/* ชื่อเพลง */}
        <Skeleton className="h-6 w-3/4 rounded" />

        {/* ชื่อศิลปิน */}
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
