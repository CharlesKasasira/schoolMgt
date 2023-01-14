import { IoEllipsisVerticalSharp } from "react-icons/io5";

function Card({title, stat, icon}) {
  return (
    <div className="outline outline-1 outline-[#e6e5e8] rounded-lg p-5 flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <div className="p-2 outline outline-1 outline-[#f1f0f3] rounded-lg w-10 h-10 flex justify-center items-center">
          {icon}
        </div>
        <IoEllipsisVerticalSharp />
      </div>

      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <h3 className="text-lg md:text-xl font-medium">{stat}</h3>
      </div>
    </div>
  );
}

export default Card;
