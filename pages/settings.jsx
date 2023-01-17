import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";

function Settings() {
  return (
    <Layout title="Settings - School">
      <Heading title="Settings" tagline="Customize your settings" />
      <div>Settings</div>
    </Layout>
  );
}

export default Settings;

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
