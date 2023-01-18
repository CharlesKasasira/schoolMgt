import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { teachersData } from "../../utils/mockData";
import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";

function Teacher() {
  const router = useRouter();
  const { id } = router.query;

  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    getTeacher();

    return () => {};
  }, []);
  console.log(teacher);

  const getTeacher = async () => {
    // const singleTeacher = teachersData.filter((teacher) => teacher.id === id);
    // setTeacher(singleTeacher[0]);
    const { data, error } = await supabase
      .from("usermeta")
      .select("*")
      .eq("claim", "teacher")
      .eq("id", id)
      .single();
    if (data) {
      setTeacher(data);
    }
  };

  return (
    <Layout>
      <Heading
        title={teacher && `${teacher.first_name + " " + teacher.last_name}`}
        tagline="Manage teachers"
      />
      <main>
        <div>Full Name: {teacher.last_name + " " + teacher.first_name}</div>
        <div>Phone Number: {teacher.phone_number}</div>
        <div>Nationality: {teacher.nationality}</div>
      </main>
    </Layout>
  );
}

export default Teacher;

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
