import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";

function AddGrades({ students }) {
  return (
    <Layout title="Add Grades - School">
      <ToastContainer />
      <Heading title="Add Grades" tagline="Register a new exam set" />
      <section className="mt-10 px-10 pt-5 text-md text-[#555b6d]">
        <Formik
          initialValues={{
            password: "changeit",
            first_name: "",
            last_name: "",
            claim: "admin",
            email: "",
            gender: "",
            nationality: "",
            phone_number: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            // addNewTeacher(event, values, resetForm);
            const {
              email,
              first_name,
              last_name,
              contact_number,
              password,
              gender,
              nationality,
            } = values;
            await axios
              .post("/api/add-user", {
                email: email,
                password: password,
                details: {
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  phone_number: "256" + contact_number,
                  claim: "teacher",
                  gender: gender,
                  nationality: nationality,
                },
              })
              .then((res) =>
                toast.success(`Successfully added teacher`, {
                  position: "top-right",
                })
              )
              .catch((error) =>
                toast.error(`Error adding teacher`, { position: "top-right" })
              );
            resetForm({
              password: "",
              first_name: "",
              last_name: "",
              claim: "teacher",
              email: "",
              phone_number: "",
              gender: "",
              nationality: "",
            });
          }}
          // validationSchema={addCustomerValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => {
            return (
              <Form className="my-5">
                <div className="flex flex-col my-3">
                  <label htmlFor="email" className="mb-1 w-4/12 md:w-2/12">
                    Examination Set
                  </label>
                  <div className="w-12/12 md:w-8/12">
                    <select
                      name=""
                      id=""
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                    >
                      <option value="">Select</option>
                      <option value="bot">B.O.T</option>
                      <option value="mot">M.O.T</option>
                      <option value="eot">E.O.T</option>
                      <option value="mocks">Mocks</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <label htmlFor="" className="mb-1 w-4/12 md:w-2/12">
                    Term
                  </label>
                  <div className="w-12/12 md:w-8/12 flex gap-2">
                    <select
                      name=""
                      id=""
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                    >
                      <option value="">Select Term</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <input
                      type="text"
                      name="text"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter year"
                      onChange={handleChange("last_name")}
                      onBlur={handleBlur("last_name")}
                      value={values.last_name}
                      required
                    />
                  </div>
                </div>

                <div className="outline outline-1 outline-[#e5e7eb] my-5 overflow-x-scroll select-none rounded-md">
                  <table className="bg-white w-full table-auto p-10 select-none">
                    <thead>
                      <tr className="border-b bg-[#f9fafd] rounded-t-lg text-[#555b6d]">
                        <th className="py-4 text-left pl-3 font-light">
                          <div className="flex items-center">Student Name</div>
                        </th>
                        <th className="py-4 text-left pl-3 font-light">
                          <div className="flex items-center">Marks</div>
                        </th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                        <th className="py-4 text-left pl-3 font-light"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4 pl-2 text-left text-gray-500"></td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          Math
                        </td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          English
                        </td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          Science
                        </td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          SST
                        </td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          Average
                        </td>
                        <td className="py-4 pl-2 text-left text-gray-500">
                          Grade
                        </td>
                      </tr>
                      {students &&
                        students.map((student, index) => (
                          <tr key={index}>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              {student.first_name + " " + student.last_name}
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10"
                                type="text"
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex my-3 md:my-5">
                  <button
                    type="submit"
                    className="text-white py-2 px-4 my-2 mt-4  bg-[#0e927a] hover:bg-[#0e8c75] outline outline-1 outline-[#0e927a] gap-2 w-12/12 md:w-8/12 rounded-sm"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </Layout>
  );
}

export default AddGrades;

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

  const { data: students, error } = await supabase
    .from("usermeta")
    .select("*")
    .eq("claim", "student");

  // If there is a user, return it.
  return { props: { person, students } };
}
