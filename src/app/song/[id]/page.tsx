"use client";

import { useGetDetailSongQuery } from "@/libs/rtk/song";
import { useParams } from "next/navigation";


function SongDetailPage() {
    const params = useParams();
    const id = params.id
    const { data : song} = useGetDetailSongQuery(Number(id));

  return (
    <div className="flex items-center justify-center">
      <p>{song?.title}</p>
    </div>
  )
}
export default SongDetailPage