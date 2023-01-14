import Layout from "@/components/Layout";
import Heading from "../components/Heading";
import { useRouter } from "next/router";
import { FaSort } from "react-icons/fa";
import { teachersData } from "../utils/mockData";
import { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

function TeachersList() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    getTeachers();
    return () => {};
  }, []);
  const getTeachers = () => {
    setTeachers(teachersData);
  };
  return (
    <Layout title="Teacher - School">
      <Heading title="Teachers" tagline="Manage teachers" />
      <section className="flex justify-end items-center my-10 gap-2">
        <button
          className="py-2 px-4 my-2 hover:text-[#0d846e] outline outline-1 outline-gray-800 flex items-center gap-2 rounded text-sm"
          onClick={() => router.push("/add-teacher")}
        >
          <AiOutlineCloudDownload size={22} />
          Export
        </button>
        <button
          className="bg-[#0b7a66] text-white py-2 px-4 my-2 hover:bg-transparent hover:text-[#0d846e] outline outline-1 outline-[#0b7a66] flex items-center gap-2 rounded text-sm"
          onClick={() => router.push("/add-teacher")}
        >
          <IoMdAdd size={22} />
          Add
        </button>
      </section>
      <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll select-none rounded-md">
        <table className="bg-white w-full table-auto p-10 select-none">
          <thead>
            <tr className="border-b bg-[#f9fafd] rounded-t-lg text-[#555b6d]">
              <th className="py-4 text-center text-[#ebecef] rounded-md pl-4 px-3 w-1">
                <input
                  type="checkbox"
                  className="accent-[#0b7a66]"
                  name=""
                  id=""
                  // ref={checkbox}
                  onChange={() => {}}
                />
              </th>
              <th className="py-4 text-left pl-3 font-light">
                <div className="flex items-center">
                  Name
                  <i
                    className="cursor-pointer"
                    onClick={() => {
                      setSortNames(!sortNames);
                      setSortBy("name");
                    }}
                  >
                    <FaSort size={13} />
                  </i>
                </div>
              </th>
              <th className="py-4 text-left pl-3 font-light flex items-center">
                Gender
                <i
                  className="cursor-pointer"
                  onClick={() => {
                    setSortNames(!sortNames);
                    setSortBy("contact_person");
                  }}
                >
                  <FaSort size={13} />
                </i>
              </th>
              <th className="py-4 text-left pl-3 font-light">
                <div className="flex items-center">
                  Telephone
                  <i
                    className="cursor-pointer"
                    onClick={() => {
                      setSortNames(!sortNames);
                      setSortBy("telephone_number");
                    }}
                  >
                    <FaSort size={13} />
                  </i>
                </div>
              </th>
              <th className="py-4 text-left pl-3 font-light"></th>
            </tr>
          </thead>
          <tbody>
            {teachers?.length > 0 &&
              teachers.map((teacher, index) => (
                <tr
                  className={`border-b border-l-2 border-l-transparent hover:border-l-[#0b7a66] cursor-pointer mb-10 text-sm`}
                  key={index}
                >
                  <td
                    className="py-4 pl-4 text-left text-gray-500"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <input
                      type="checkbox"
                      className="accent-[#0b7a66]"
                      name=""
                      id=""
                      // ref={checkbox}
                      onChange={() => {}}
                    />
                  </td>
                  <td
                    className="py-4 pl-2 text-left text-gray-500 font-medium"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    {teacher.first_name + " " + teacher.last_name}
                  </td>
                  <td className="py-4 pl-2 text-left text-gray-500">
                    {teacher.gender}
                  </td>
                  <td className="py-4 pl-2 text-left text-gray-500">
                    {teacher.phone_number}
                  </td>
                  <td className="py-4 pl-2 text-left text-gray-500">
                    <IoEllipsisVerticalSharp />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between px-3 py-3 text-xs text-[#555b6d]">
          <button className="outline outline-1 outline-[#e5e7eb] px-3 py-2 rounded">
            Previous
          </button>
          <button className="outline outline-1 outline-[#e5e7eb] px-4 py-2 rounded">
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default TeachersList;
