import React from "react";
import { menuData } from "@/utils/menuData";
import NavLink from "./NavLink";
import { useState } from "react";

function SideMenu({ role }) {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="w-full h-full relative">
      <header className="h-12 flex justify-center items-center">
        <p className="text-lg font-medium">School</p>
      </header>
      <ul className="mt-5">
        {menuData[`${role}`]?.map((menuItem, index) => (
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
      <div className="outline outline-1 outline-gray-300 rounded mx-4 px-3 py-2 bottom-2 absolute w-[80%] flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-xs text-white">
          CK
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">charles Kasasira</p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
        <button className="px-3 py-2 bg-[#0b7a66] rounded text-white text-xs w-full">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
