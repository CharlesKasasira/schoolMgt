import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function AddStudent() {
  return (
    <Layout title="Add Student - School">
      <ToastContainer />
      <Heading title="Add Student" tagline="Register a new student" />
      <section className="mt-10 text-md text-[#555b6d]">
        <Formik
          initialValues={{
            password: "changeit",
            first_name: "",
            last_name: "",
            claim: "admin",
            email: "",
            phone_number: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            // addNewTeacher(event, values, resetForm);
            const { email, first_name, last_name, contact_number, password } =
              values;
            await axios
              .post("/api/add-customer", {
                email: email,
                password: password,
                details: {
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  phone_number: "256" + contact_number,
                  claim: "admin",
                },
              })
              .then((res) =>
                toast.success(`Successfully added customer`, {
                  position: "top-center",
                })
              )
              .catch((error) =>
                toast.error(`Error adding customer`, { position: "top-center" })
              );
            resetForm({
              password: "",
              first_name: "",
              last_name: "",
              claim: "admin",
              email: "",
              phone_number: "",
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
                    Email
                  </label>
                  <div className="w-12/12 md:w-8/12">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter Email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <label htmlFor="" className="mb-1 w-4/12 md:w-2/12">
                    First Name
                  </label>
                  <div className="w-12/12 md:w-8/12">
                    <input
                      type="text"
                      name="text"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter First Name"
                      onChange={handleChange("first_name")}
                      onBlur={handleBlur("first_name")}
                      value={values.first_name}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <label htmlFor="" className="mb-1 w-4/12 md:w-2/12">
                    Last Name
                  </label>
                  <div className="w-12/12 md:w-8/12">
                    <input
                      type="text"
                      name="text"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter Last Name"
                      onChange={handleChange("last_name")}
                      onBlur={handleBlur("last_name")}
                      value={values.last_name}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <label
                    htmlFor="telephone_number"
                    className="mb-1 w-4/12 md:w-2/12"
                  >
                    Telephone
                  </label>
                  <div className="w-12/12 md:w-8/12 relative outline outline-1 outline-[#121212] rounded flex">
                    <input
                      type="tel"
                      id="telephone_number"
                      name="telephone_number"
                      placeholder="Telephone Number"
                      className=" py-2 px-2 ml-16 bg-transparent flex-grow focus:outline-none"
                      onChange={handleChange("contact_number")}
                      onBlur={handleBlur("contact_number")}
                      value={values.contact_number}
                      required
                    />
                    <select
                      name=""
                      id=""
                      className="bg-transparent absolute left-0 h-full w-16 border-r-2"
                      // onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+256">+256</option>
                    </select>
                  </div>
                </div>
                {/* <PasswordGenerator
                  password={password}
                  setPassword={setPassword}
                  resize={true}
                /> */}

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

export default AddStudent;
