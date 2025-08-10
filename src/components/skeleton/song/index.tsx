"use client";

import { SongCardLoading } from "./SongCardLoading";

function SongLoading() {
  return (
    <div className=" mt-15 flex  flex-row flex-wrap gap-8 rounded-3xl p-10">
      {Array.from({ length: 12 }).map((_, index) => (
        <SongCardLoading key={index} />
      ))}
    </div>
  );
}
export default SongLoading;
