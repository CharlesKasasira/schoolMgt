import Layout from "../components/Layout";
import Heading from "../components/Heading";
// import { useAuth } from "../utils/auth";
import AdminDash from "../components/AdminDash";
import { parseCookies } from "../utils/parseCookies";
import { supabase } from "../utils/supabase";
import Calendar from "../components/Calendar";
import Graph from "../components/Graph";
import Doughnut from "../components/Doughnut";

function Dashboard({ person, schoolStudents, schoolTeachers }) {
  // if (JSON.parse(person.user)?.user?.user_metadata.claim === "admin") {
    return (
      <Layout title="Dashboard - School">
        <Heading title="Dashboard" tagline="Welcome to the School Management" />
        <AdminDash
          students={schoolStudents.length}
          teachers={schoolTeachers.length}
        />
        <section className="mt-10 flex gap-5 lg:gap-10">
          <Doughnut
            students={schoolStudents.length}
            teachers={schoolTeachers.length}
          />
          <Calendar />
        </section>
        <section className="mt-10 mb-10">
          <Graph />
        </section>
      </Layout>
    );
  // }
}

export default Dashboard;

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

    if (
      person &&
      JSON.parse(person.user).user.user_metadata.claim === "student"
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/reports",
        },
        props: {},
      };
    } else if (
      person &&
      JSON.parse(person.user).user.user_metadata.claim === "teacher"
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/attendance",
        },
        props: {},
      };
    }
  }

  const { data: schoolStudents, error } = await supabase
    .from("usermeta")
    .select("*")
    .eq("claim", "student");

  const { data: schoolTeachers } = await supabase
    .from("usermeta")
    .select("*")
    .eq("claim", "teacher");

  // If there is a user, return it.
  return { props: { person, schoolStudents, schoolTeachers } };
}
