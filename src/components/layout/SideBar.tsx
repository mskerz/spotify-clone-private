"use client";

import Link from "next/link";
import { FaSpotify, FaHome } from "react-icons/fa";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { MdLibraryBooks as Collection } from "react-icons/md";
import { Button } from "../ui/button";
import { Plus } from 'lucide-react';


function SideBar() {
  return (
    <aside className="bg-sidebar flex h-screen w-64 flex-col p-4">
      <div className="mb-8 flex items-center space-x-2">
        <FaSpotify size={24} className="text-[#1DB954]" />
        <span className="flex items-end gap-1 text-2xl font-bold">
          Spotify
          <span className="text-muted-foreground mb-1 align-baseline text-xs font-normal">
            Private
          </span>
        </span>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="hover:bg-background flex items-center gap-3 rounded px-2 py-2 transition"
        >
          <IoHomeOutline size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-background flex items-center gap-3 rounded px-2 py-2 transition"
        >
          <IoSearchOutline size={20} />
          <span>Search</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-background flex items-center gap-3 rounded px-2 py-2 transition"
        >
          <Collection size={20} />
          <span>Your Collection</span>
        </Link>

        <Button className="w-full cursor-pointer rounded-3xl bg-[#1DB954] hover:bg-[#1DB954]">
          <Plus/> Create Playlist
        </Button>
      </nav>
      <div className="my-6 border-t border-[#282828]"></div>
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <Link
          href="#"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          Playlist 1
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          Playlist 2
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          Playlist 3
        </Link>
        {/* Add more playlists here */}
      </nav>
    </aside>
  );
}
export default SideBar;
