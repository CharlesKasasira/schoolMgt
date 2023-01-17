import Layout from "../components/Layout";
import Heading from "../components/Heading";
// import { useAuth } from "../utils/auth";
import AdminDash from "../components/AdminDash";
// import parseCookies from "../utils/parseCookies";
// import { supabase } from "../utils/supabase";

function Dashboard() {
  // const { role } = useAuth();
  const role = "admin";

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

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);

//   if (!user) {
//     // If no user, redirect to index.
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }

//   // If there is a user, return it.
//   return { props: { user } };
// }
