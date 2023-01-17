import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";

function Attendance() {
  return (
    <Layout title="Attendance - School">
      <Heading title="Attendance" tagline="Manage Attendance" />
      <div>attendance</div>
    </Layout>
  );
}

export default Attendance;

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
