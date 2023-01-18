import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { toast } from "react-toastify";
import { timeConvert } from "../utils/utilites";
import { RiCalendarTodoFill } from "react-icons/ri";
import { useEffect } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    getAttendance();
  }, [attendance]);

  const [todayAttendance, setTodayAttendancd] = useState({});
  const { user } = useAuth();

  const getAttendance = async () => {
    const { data: attendance, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user", user.id)
      .order("created_at", { ascending: false });

    setAttendance(attendance);
  };

  const handleCheckin = async () => {
    const { data, error } = await supabase.from("attendance").insert([
      {
        user: user.id,
        checkin: `${new Date()
          .toISOString()
          .slice(
            0,
            10
          )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        checkout: "",
      },
    ]);
    if (data) {
      toast.success("checked in", { position: "top-right" });
    } else if (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .update({
        checkout: `${new Date()
          .toISOString()
          .slice(
            0,
            10
          )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      })
      .match({ id: attendance[0].id });

    if (data) {
      toast.success("checked in", { position: "top-right" });
    } else if (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Attendance - School">
      <Heading title="Attendance" tagline="Manage Attendance" />
      {attendance.length === 0 ||
      (attendance.length > 0 &&
        new Date().toISOString().slice(0, 10) !==
          attendance[0].checkin.slice(0, 10)) ? (
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded text-sm"
          onClick={handleCheckin}
        >
          Check In
        </button>
      ) : new Date().toISOString().slice(0, 10) !==
        attendance[0]?.checkout.slice(0, 10) ? (
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded text-sm"
          onClick={handleCheckout}
        >
          Check Out
        </button>
      ) : (
        <div>
          <p className="m-1 outline outline-1 px-3 py-2 outline-gray-300 text-sm text-gray-600">
            You have checked out
          </p>
        </div>
      )}

      {attendance !== null && attendance.length > 0 ? (
        <div className="outline outline-1 outline-[#e5e7eb] my-5 overflow-x-scroll select-none rounded-md">
          <table className="bg-white w-full table-auto p-10 select-none">
            <thead>
              <tr className="border-b bg-[#f9fafd] rounded-t-lg text-[#555b6d]">
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">Check In</div>
                </th>
                <th className="py-4 text-left pl-3 font-light flex items-center">
                  Check Out
                </th>
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">Duaration</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attend, index) => (
                <tr
                  className={`border-b border-l-2 border-l-transparent hover:border-l-[#0b7a66] cursor-pointer mb-10 text-sm`}
                  key={index}
                >
                  <td className="py-4 pl-2 text-left text-gray-500">
                    {attend.checkin}
                  </td>
                  <td className="py-4 pl-2 text-left text-gray-500">
                    {!attend.checkout ? "Didn't check out" : attend.checkout}
                  </td>
                  <td className="py-4 pl-2 text-left text-gray-500">
                    {!attend.checkout
                      ? "Can not be determined!"
                      : `${timeConvert(
                          (new Date(attend.checkout) -
                            new Date(attend.checkin)) /
                            1000 /
                            60
                        )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-table-data text-gray-400 flex py-5 px-5 flex-col justify-center items-center my-5 text-sm">
          <i>
            <RiCalendarTodoFill size={40} />
          </i>
          <h4>No Log trails yet</h4>
          <p>You have never checked</p>
        </div>
      )}
    </Layout>
  );
}

export default Attendance;

export async function getServerSideProps({ req, res }) {
  const person = parseCookies(req);
  if (res) {
    if (!person.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }

  const { data: attendance, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("user", JSON.parse(person.user).user.id)
    .order("created_at", { ascending: false });

  // If there is a user, return it.
  return { props: { person, attendance } };
}
