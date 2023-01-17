import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { teachersData } from "../../utils/mockData";
import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import { supabase } from "../../utils/supabase";

function Teacher() {
  const router = useRouter();
  const { id } = router.query;

  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    getTeachers();

    return () => {};
  }, []);
  console.log(teacher);

  const getTeachers = () => {
    const singleTeacher = teachersData.filter((teacher) => teacher.id === id);
    setTeacher(singleTeacher[0]);
  };

  return (
    <Layout>
      <Heading
        title={teacher && `${teacher.first_name + " " + teacher.last_name}`}
        tagline="Manage teachers"
      />
      <div>Teacher {id}</div>
    </Layout>
  );
}

export default Teacher;

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
