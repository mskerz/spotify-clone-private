"use client";

import Link from "next/link";
import { FaSpotify ,FaHome} from "react-icons/fa";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { MdLibraryBooks as Collection } from "react-icons/md";

function SideBar() {
  return (
    <aside className="h-screen  w-64 bg-[#1d1d1d] text-white flex flex-col p-4">
      <div className="mb-8 flex items-center space-x-2">
        <FaSpotify size={24} className="text-[#1DB954]" />
        <span className="text-2xl font-bold flex items-end gap-1">
          Spotify
          <span className="text-xs font-normal text-gray-400 mb-1 align-baseline">private</span>
        </span>
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#282828] transition">
          <IoHomeOutline size={20} />
          <span>Home</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#282828] transition">
          <IoSearchOutline size={20} />
          <span>Search</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#282828] transition">
          <Collection size={20} />
          <span>Your Collection</span>
        </Link>
      </nav>
      <div className="border-t border-[#282828] my-6"></div>
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <Link href="#" className="text-sm text-gray-400 hover:text-white transition">Playlist 1</Link>
        <Link href="#" className="text-sm text-gray-400 hover:text-white transition">Playlist 2</Link>
        <Link href="#" className="text-sm text-gray-400 hover:text-white transition">Playlist 3</Link>
        {/* Add more playlists here */}
      </nav>
      <div className="mt-6">
        <button className="w-full py-2 bg-[#1DB954] text-black rounded font-semibold hover:bg-[#1ed760] transition">
          Create Playlist
        </button>
      </div>
    </aside>
  )
}
export default SideBar