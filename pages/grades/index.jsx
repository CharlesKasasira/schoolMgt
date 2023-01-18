import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";

function Grades({ person }) {
  const router = useRouter();

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

  // If there is a user, return it.
  return { props: { person } };
}
