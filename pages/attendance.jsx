import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";

function Attendance() {
  return (
    <Layout title="Attendance - School">
      <Heading title="Attendance" tagline="Manage Attendance" />
      <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm">Check in</button>
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

  // If there is a user, return it.
  return { props: { person } };
}
