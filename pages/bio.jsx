"use client"
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { MdPerson } from "react-icons/md";

function Bio() {
  const [student, setStudent] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getStudentDetails();
    return () => {};
  }, []);

  const getStudentDetails = async () => {

    const { data, error } = await supabase
      .from("usermeta")
      .select("*")
      .eq("claim", "student")
      .eq("id", user.id)
      .single();
    if (data) {
      setStudent(data);
    }
  };
  return (
    <Layout title="Bio Data - School">
      <Heading title="Student Bio" tagline="Manage Student Bio" />
      <main>
        <div className="w-20 h-20 rounded-lg bg-gray-300 flex justify-center items-center text-xs text-white mb-2">
          <MdPerson size={64} />
        </div>
        <div>Full Name: {student.last_name + " " + student.first_name}</div>
        <div>Phone Number: {student.phone_number}</div>
        <div>Nationality: {student.nationality}</div>
      </main>
    </Layout>
  );
}

export default Bio;

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
