import { menuData } from "../utils/menuData";
import NavLink from "./NavLink";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import Link from "next/link";
import { useAuth } from "../utils/auth";
import { useCookies } from "react-cookie";
import { HiOutlineLogout } from "react-icons/hi";

function SideMenu({ person }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const { user, signOut } = useAuth();

  return (
    <div className="w-full h-full relative">
      {user?.user_metadata.claim === "student" ? (
        <header className="flex justify-center items-center bg-[#2c3a47] text-white h-28 flex-col">
          <div className="w-10 h-10 rounded-lg bg-gray-400 flex justify-center items-center text-xs text-white">
            {user?.user_metadata?.last_name[0].toUpperCase() +
              user?.user_metadata?.first_name[0].toUpperCase()}
          </div>
          <div className="flex-col justify-center items-center">
            <p className="text-lg font-medium">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
            </p>
            <p className="text-xs text-gray-400 uppercase">
              {user?.user_metadata?.claim}
            </p>
          </div>
        </header>
      ) : (
        <header className="h-12 flex justify-center items-center">
          <p className="text-lg font-medium">School</p>
        </header>
      )}

      <ul className="mt-5">
        {menuData[`${user?.user_metadata.claim}`]?.map((menuItem, index) => (
          <NavLink
            name={menuItem.label}
            icon={menuItem.icon}
            href={menuItem.link}
            key={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            index={index}
          />
        ))}
      </ul>

      {user?.user_metadata.claim === "student" ? (
        <p
          className="absolute bottom-2 cursor-pointer text-gray-500 w-[80%] mx-4 px-3 py-2 flex items-center gap-1"
          onClick={() => {
            signOut();
          }}
        >
          <Link href="/login" className="flex items-center gap-1">
            <HiOutlineLogout />
            Log out
          </Link>
        </p>
      ) : (
        <div className="outline outline-1 outline-gray-300 rounded mx-4 px-3 py-2 bottom-2 absolute w-[80%] flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-xs text-white">
            {user?.user_metadata?.last_name[0].toUpperCase() +
              user?.user_metadata?.first_name[0].toUpperCase()}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">
              {user?.user_metadata?.last_name} {user?.user_metadata?.first_name}
            </p>
            <p className="text-xs text-gray-400 uppercase">
              {user?.user_metadata?.claim}
            </p>
          </div>
          <button
            className="px-3 py-2 bg-[#0b7a66] rounded text-white text-xs w-full"
            onClick={() => {
              signOut();
            }}
          >
            <Link href="/login">Sign Out</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default SideMenu;
