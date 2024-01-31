import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../utils/supabase";
import { parseCookies } from "../../utils/parseCookies";
import { useState } from "react";

function AddGrades({ students }) {
  const [set, setSet] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [term, setTerm] = useState("");
  const [studentClass, setClass] = useState("");
  // const []
  const studentInitial = students.map((student) => {
    const obj = {
      student: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      math: "",
      english: "",
      science: "",
      sst: "",
      average: "",
      grade: "",
    };
    return obj;
  });

  return (
    <Layout title="Add Grades - School">
      <Heading title="Add Grades" tagline="Register a new exam set" />
      <section className="mt-10 px-10 pt-5 text-md text-[#555b6d]">
        <Formik
          initialValues={{ students: studentInitial }}
          onSubmit={async (values) => {
            const { data } = await supabase
              .from("exams")
              .insert([
                { set: set, year: year, term: term, class: studentClass },
              ]);

            if (data) {
              values.students.forEach(async (student, index) => {
                const { data: reportData, error } = await supabase
                  .from("report")
                  .insert([{ term, set, year, exam: data[0].id, ...student }]);

                if (reportData) {
                } else {}
              });
            }
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
                <div className="flex w-full">
                  <div className="flex flex-col my-3 w-full">
                    <label htmlFor="set" className="mb-1 w-full">
                      Examination Set
                    </label>
                    <div className="w-12/12 md:w-8/12">
                      <select
                        name=""
                        id=""
                        className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                        value={set}
                        onChange={(event) => setSet(event.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="bot">B.O.T</option>
                        <option value="mot">M.O.T</option>
                        <option value="eot">E.O.T</option>
                        <option value="mocks">Mocks</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col my-3 w-full">
                    <label htmlFor="set" className="mb-1 w-full">
                      Class
                    </label>
                    <div className="w-12/12 md:w-8/12">
                      <select
                        name=""
                        id=""
                        className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                        value={studentClass}
                        onChange={(event) => setClass(event.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">P1</option>
                        <option value="2">P2</option>
                        <option value="3">P3</option>
                        <option value="4">P4</option>
                        <option value="5">P5</option>
                        <option value="6">P6</option>
                        <option value="7">P7</option>
                      </select>
                    </div>
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
                      value={term}
                      onChange={(event) => setTerm(event.target.value)}
                      required
                    >
                      <option value="">Select Term</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <input
                      type="text"
                      name="year"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter year"
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
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
