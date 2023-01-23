import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";

function Chat({ schoolTeachers }) {
  const [upMessages, setUpMessages] = useState(false);
  const [talkTo, setTalkTo] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  const getUsers = async () => {
    if (user && user?.claim === "student") {
      const { data: schoolStudents, error } = await supabase
        .from("usermeta")
        .select("*")
        .eq("claim", "student");

      setTalkTo(schoolStudents);
    }
  };

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
          <div className="h-full overflow-y-scroll px-3 py-2">
            {talkTo &&
              talkTo.map((talk, index) => (
                <div key={index} className="px-2 py-2 flex items-center gap-2 mb-2 border-b-[1px]">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-xs text-white">
                    {talk.first_name[0].toUpperCase() +
                      talk.last_name[0].toUpperCase()}
                  </div>
                  <p>{talk.first_name + " " + talk.last_name}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
