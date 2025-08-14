"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Smile } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetSongsQuery } from "@/libs/rtk/song";
import { Song } from "@/types/song";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
}

function SongsAutocomplete({ query, onQueryChange }: Props) {
  const { data: songs } = useGetSongsQuery();
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  // Filter songs when query changes
  useEffect(() => {
    if (!songs) return;

    const q = query.toLowerCase();
    const filtered = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q)
    );
    setFilteredSongs(filtered);
  }, [query, songs]);

  return (
    <Command data-slot="command" className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput
        placeholder="Search your song..."
        value={query}
        onValueChange={onQueryChange} // ส่ง string ขึ้น parent
      />
      {query.length > 0 && (
        <CommandList>
          {filteredSongs.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          <CommandGroup heading="Songs">
            {filteredSongs.map((song) => (
              <CommandItem key={song.id}>
                <Image
                  src={song.coverImage}
                  alt={song.title}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="ml-2 flex flex-col">
                  <span className="font-medium">{song.title}</span>
                  <span className="text-xs text-gray-500">{song.artist}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}

export default SongsAutocomplete;
