import Layout from "../components/Layout";
import Heading from "../components/Heading";
// import { useAuth } from "../utils/auth";
import AdminDash from "../components/AdminDash";
import { parseCookies } from "../utils/parseCookies";
import { supabase } from "../utils/supabase";

function Dashboard({ person, schoolStudents, schoolTeachers }) {
  const role = "admin";

  console.log("person: ", JSON.parse(person.user).user.user_metadata.claim);

  if (role === "admin") {
    return (
      <Layout title="Dashboard - School">
        <Heading title="Dashboard" tagline="Welcome to the School Management" />
        <AdminDash students={schoolStudents.length} teachers={schoolTeachers.length} />
      </Layout>
    );
  }
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
