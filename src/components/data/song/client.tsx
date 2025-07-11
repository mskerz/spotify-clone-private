"use client";

import { setSongs, setLoading } from "@/providers/redux/slice/song";
import {Song} from "@/types/song";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongList from "./song";
import { RootState } from "@/providers/redux/store";

type SongProps = {
  initialSongs: Song[];
};
function SongClient({ initialSongs }: SongProps) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.song);

  useEffect(() => {
    dispatch(setLoading());
    dispatch(setSongs(initialSongs));
  }, [dispatch, initialSongs]);


 
  return (
    <>
      <SongList />
    </>
  );
}
export default SongClient;
