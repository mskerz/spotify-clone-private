"use client";

import { useRedux } from "@/hook/redux";
import  {authActions} from "@/providers/redux/slice/action";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const {dispatch, useSelector } = useRedux();

  const { user, isLoggedIn ,loading } = useSelector((state) => state.auth);

  const handleLogout =() => {
    dispatch( authActions.signOutUser());
  }
  return (
    <nav className="sticky top-0 flex items-center justify-between bg-transparent p-2 py-3 text-white backdrop-blur-2xl">
      <div></div>
      <ul className="flex space-x-8 font-medium">
        <li className="w-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-[#282828] px-4 py-2 text-white"
            style={{ border: "1px solid #535353" }}
          />
        </li>
      </ul>
      <div className="mr-10 flex space-x-4">
        <button className="px-5 py-2 font-semibold">EN</button>
        {loading ? (
          <div>Loading...</div>
        ) : user && isLoggedIn ? (
            <div className="flex items-center space-x-2">
             <Image
              src={user.detail.avatarUrl || "/default-avatar.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="h-9 w-9 outline-4 outline-green-500 rounded-full object-cover"
            />
            <span>{user.detail.firstName}</span>
            <button onClick={handleLogout} className="cursor-pointer hover:text-green-200">Logout</button>
            </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-[#1ED760] px-5 py-2 font-semibold text-black transition-colors hover:bg-[#1db954]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
