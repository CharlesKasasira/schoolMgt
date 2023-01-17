import Layout from "../components/Layout";
import Heading from "../components/Heading"
import { supabase } from "../utils/supabase";

function Payments() {
  return (
    <Layout title="Payments - School">
      <Heading title="Payments" tagline="Manage your payments" />
      <div>payments</div>
    </Layout>
  );
}

export default Payments;

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);

//   if (!user) {
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
