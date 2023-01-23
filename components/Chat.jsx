import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

function Chat({ schoolTeachers }) {
  const [upMessages, setUpMessages] = useState(false);

  return (
    <div
      className={`shadow-lg bg-white  z-20 outline outline-1 outline-gray-300 rounded-t-lg fixed bottom-0 right-1 w-72 ${
        upMessages ? "h-[80%]" : "h-10"
      } collapse-chatbox`}
    >
      <div className="px-3 py-2 flex justify-between items-center border-b h-10">
        <p>Messages</p>
        {upMessages ? (
          <MdKeyboardArrowDown
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setUpMessages(!upMessages);
            }}
          />
        ) : (
          <MdKeyboardArrowUp
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setUpMessages(!upMessages);
            }}
          />
        )}
      </div>
      {upMessages && (
        <div className="w-full h-full flex-col">
          <div className="w-full px-3 py-2">
            <input
              type="text"
              className="outline outline-1 outline-gray-300 text-sm w-full px-3 py-2 rounded"
              name=""
              placeholder="Search messages"
              id=""
            />
          </div>
          <div className="outline-1 h-full"></div>
        </div>
      )}
    </div>
  );
}

export default Chat;
