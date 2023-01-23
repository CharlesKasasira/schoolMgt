import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";
import { ImFilesEmpty } from "react-icons/im";
import Link from "next/link";

function Grades({ person, exams }) {
  const router = useRouter();

  console.log("exams: ", exams);

  return (
    <Layout title="Grades - School">
      <Heading title="Grades" tagline="Add Students grades" />
      <section className="flex justify-end items-center my-10 gap-2">
        <button
          className="py-2 px-4 my-2 hover:text-[#0d846e] outline outline-1 outline-gray-800 flex items-center gap-2 rounded text-sm"
          onClick={() => router.push("/teachers/add")}
        >
          <AiOutlineCloudDownload size={22} />
          Export
        </button>
        <button
          className="bg-[#0b7a66] text-white py-2 px-4 my-2 hover:bg-transparent hover:text-[#0d846e] outline outline-1 outline-[#0b7a66] flex items-center gap-2 rounded text-sm"
          onClick={() => router.push("/grades/add")}
        >
          <IoMdAdd size={22} />
          Add
        </button>
      </section>

      <div className="">
        {exams && exams.length > 0 ? (
          exams.map((exam, index) => (
            <div
              key={index}
              className="outline outline-1 outline-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center bg-white"
              onClick={() => {}}
            >
              <Link href={`/grades/set/${exam.id}`} className="cursor-pointer w-full">
                Term {exam.term} {exam.set} {exam.year}
              </Link>
              <IoIosArrowDown />
            </div>
          ))
        ) : (
          <div className="flex px-5 py-5 flex-col items-center justify-center gap-3">
            <i>
              <ImFilesEmpty size={40} />
            </i>
            <div className="text-sm text-center">
              <h4>No Exams</h4>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Grades;

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

  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    // .eq("student", JSON.parse(person.user).user.id)
    .order("year", { ascending: false });

  // If there is a user, return it.
  return { props: { person, exams } };
}
