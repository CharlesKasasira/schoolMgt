import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";

function Bio() {
  return (
    <Layout title="Profile - School">
      <Heading title="Student Bio" tagline="Manage Student Bio" />
      <div>bio</div>
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
