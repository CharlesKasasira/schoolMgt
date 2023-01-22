import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";
import { useState } from "react";

function AddGrades({ students }) {
  console.log(students);
  const studentInitial = students.map((student) => {
    const obj = {
      uuid: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      math: "",
      math: "",
      english: "",
      science: "",
      average: "",
      grade: "",
      sst: "",
      term: "",
      set: "",
      year: "",
    };
    return obj;
  });
  console.log("studentInitial :", studentInitial);

  const initialValues = [
    {
      uuid: "Charles Kasasira",
      first_name: "Charles",
      last_name: "Kasasira",
      math: "",
      math: "",
      english: "",
      science: "",
      average: "",
      grade: "",
      sst: "",
      term: "",
      set: "",
      year: "",
    },
    {
      uuid: "Joseph Okello",
      first_name: "Joseph",
      last_name: "Okello",
      math: "",
      math: "",
      english: "",
      science: "",
      average: "",
      grade: "",
      sst: "",
      term: "",
      set: "",
      year: "",
    },
  ];

  return (
    <Layout title="Add Grades - School">
      <Heading title="Add Grades" tagline="Register a new exam set" />
      <section className="mt-10 px-10 pt-5 text-md text-[#555b6d]">
        <Formik
          initialValues={{ students: studentInitial }}
          onSubmit={(values) => {
            console.log(values);
          }}
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
              <Form>
                <div className="flex flex-col my-3">
                  <label htmlFor="set" className="mb-1 w-full">
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
                      required
                    />
                  </div>
                </div>
                <FieldArray
                  name="students"
                  render={(arrayHelpers) => (
                    <div className="">
                      <div className="flex mb-2 items-end w-full">
                        <label htmlFor="" className="md:w-1/3">
                          Student Name
                        </label>
                        <div className="w-2/3 flex justify-between">
                          <label htmlFor="" className="p-1 w-10">
                            Math
                          </label>
                          <label htmlFor="" className="p-1 w-10">
                            Eng
                          </label>
                          <label htmlFor="" className="p-1 w-10">
                            Sci
                          </label>
                          <label htmlFor="" className="p-1 w-10">
                            Sst
                          </label>
                          <label htmlFor="" className="p-1 w-10">
                            avg
                          </label>
                          <label htmlFor="" className="p-1 w-10">
                            Gra
                          </label>
                        </div>
                      </div>
                      {values.students && values.students.length > 0 ? (
                        values.students.map((student, index) => (
                          <div
                            key={index}
                            className="flex outline outline-1 outline-gray-300 py-2 px-2 rounded-sm mb-2 items-end w-full"
                          >
                            <label htmlFor="" className="md:w-1/3">
                              {student.first_name + " " + student.last_name}
                            </label>
                            <div className="w-2/3 flex justify-between">
                              <Field
                                name={`students[${index}].math`}
                                value={students[index].math}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].math`
                                )}
                                onBlur={handleBlur(`students[${index}].math`)}
                              />
                              <Field
                                name={`students[${index}].english`}
                                value={students[index].english}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].english`
                                )}
                                onBlur={handleBlur(
                                  `students[${index}].english`
                                )}
                              />
                              <Field
                                name={`students[${index}].science`}
                                value={students[index].science}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].science`
                                )}
                                onBlur={handleBlur(
                                  `students[${index}].science`
                                )}
                              />
                              <Field
                                name={`students[${index}].sst`}
                                value={students[index].sst}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].sst`
                                )}
                                onBlur={handleBlur(`students[${index}].sst`)}
                              />
                              <Field
                                name={`students[${index}].average`}
                                value={students[index].average}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].average`
                                )}
                                onBlur={handleBlur(
                                  `students[${index}].average`
                                )}
                              />
                              <Field
                                name={`students[${index}].grade`}
                                value={students[index].grade}
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                onChange={handleChange(
                                  `students[${index}].grade`
                                )}
                                onBlur={handleBlur(`students[${index}].grade`)}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Student
                        </button>
                      )}
                      <div className="w-full">
                        <button
                          type="submit"
                          className="text-white py-2 px-4 my-2 mt-4  bg-[#10a37f] hover:bg-[#0e8c75] outline outline-1 outline-[#0e927a] gap-2 w-full rounded-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                />
              </Form>
            );
          }}
        </Formik>

        {/* <Formik
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
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10 rounded-sm"
                                type="text"
                              />
                            </td>
                            <td className="py-4 pl-2 text-left text-gray-500">
                              <input
                                className="outline outline-1 p-1 w-10 rounded-sm"
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
        </Formik> */}
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
