import Layout from "@/components/Layout";
import Heading from "../components/Heading";
import { useAuth } from "@/utils/auth";
import AdminDash from "../components/AdminDash";
import parseCookies from "../utils/parseCookies";

function Dashboard() {
  const { role } = useAuth();
  if (role === "admin") {
    return (
      <Layout title="Dashboard - School">
        <Heading title="Dashboard" tagline="Welcome to the School Management" />
        <AdminDash />
      </Layout>
    );
  }
  return (
    <Layout title="Dashboard - School">
      <Heading title="Dashboard" tagline="Welcome to the School Management" />
      This is the Dashboard
    </Layout>
  );
}

export default Dashboard;

export const getServerSideProps = async ({ req, res }) => {
  // console.log(req)
  // const person = await parseCookies(req);
  // if (res) {
  //   if (!person.user) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: "/login",
  //       },
  //       props: {},
  //     };
  //   }
  // }

  return {
    props: {
      // person,
    },
  };
};
