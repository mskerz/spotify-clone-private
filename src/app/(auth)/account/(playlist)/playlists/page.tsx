"use client";

import { useState } from "react";
import { Grid, List, SortAsc, SortDesc } from "lucide-react";
import { useRedux } from "@/hooks/redux";
import Playlists from "@/components/data/playlist";
import { ItemDisplay, ItemDisplayType } from "@/types/enum/display";

 

enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export default function PlayListPage() {
  const { dispatch } = useRedux();
  const [{ display }, setDisplay] = useState<ItemDisplayType>({ display: ItemDisplay.COLUMN });
  const [sort, setSort] = useState<SortType>(SortType.ASC);


  const handleSort = () => {
    if (sort === SortType.ASC) {
      setSort(SortType.DESC);
    } else {
      setSort(SortType.ASC);
    }
  };

  const handleDisplay = () => {
    if ( display=== ItemDisplay.COLUMN) {
      setDisplay({display:ItemDisplay.GRID});
    } else {
      setDisplay({display:ItemDisplay.COLUMN});
    }
  };
  return (
    <>
      <div className="inline-flex justify-between gap-2">
        <button onClick={handleSort} className="flex items-center gap-2">
          {sort === SortType.ASC ? <SortAsc /> : <SortDesc />}
          Sort
        </button>
        <button onClick={handleDisplay} className="rounded-full p-2">
          {display === ItemDisplay.COLUMN ? (
            <List className="h-6 w-6" />
          ) : (
            <Grid className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="space-y-2">
        <Playlists display={display} />
      </div>
    </>
  );
}
 