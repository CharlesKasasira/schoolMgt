import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";

function Bio() {
  return (
    <Layout title="Profile - School">
      <Heading title="Student Bio" tagline="Manage Student Bio" />
      <div>bio</div>
    </Layout>
  );
}

export default Bio;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  // If there is a user, return it.
  return { props: { user } };
}
