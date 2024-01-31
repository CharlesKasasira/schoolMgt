import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { teachersData } from "../../utils/mockData";
import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";

function Teacher({ student }) {
  const router = useRouter();
  const { id } = router.query;

  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    getTeachers();

    return () => {};
  }, []);

  const getTeachers = async () => {

    const { data, error } = await supabase
      .from("usermeta")
      .select("*")
      .eq("claim", "student")
      .eq("id", id)
      .single();
    if (data) {
      setTeacher(data);
    }
  };

  return (
    <Layout>
      <Heading
        title={student && `${student.first_name + " " + student.last_name}`}
        tagline="Manage students"
      />
      <main>
        <div>Full Name: {student.last_name + " " + student.first_name}</div>
        <div>Phone Number: {student.phone_number}</div>
        <div>Nationality: {student.nationality}</div>
      </main>
    </Layout>
  );
}

export default Teacher;

export async function getServerSideProps({ req, res, params }) {
  console.log(params);
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

  const { data: student, error } = await supabase
    .from("usermeta")
    .select("*")
    .eq("claim", "student")
    .eq("id", params.id)
    .single();

  // If there is a user, return it.
  return { props: { person, student } };
}
