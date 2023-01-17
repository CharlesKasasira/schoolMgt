import Layout from "../components/Layout";
import Heading from "../components/Heading";
// import { useAuth } from "../utils/auth";
import AdminDash from "../components/AdminDash";
import { parseCookies } from "../utils/parseCookies";

function Dashboard({ person }) {
  const role = "admin";

  console.log("person: ", JSON.parse(person.user).user.user_metadata.claim);

  if (role === "admin") {
    return (
      <Layout title="Dashboard - School">
        <Heading title="Dashboard" tagline="Welcome to the School Management" />
        <AdminDash />
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

  // If there is a user, return it.
  return { props: { person } };
}
