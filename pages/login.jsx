import React, { useState, useRef } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useAuth } from "../utils/auth";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import Head from "next/head";
import { parseCookies } from "../utils/parseCookies";
import Spinner from "../components/Spinner";
import { MdOutlineError } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

const Login = ({ user }) => {
  // const { setSession } = useAuth();
  const [cookie, setCookie] = useCookies(["user"]);
  const [showPassword, togglePassword] = useState(false);

  const toastId = useRef(null);

  console.log("there is:", user);

  return (
    <>
      <Head>
        <title>Login - School Management System</title>
      </Head>
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            // toast.info("signing in", {
            //   position: "top-right",
            //   hideProgressBar: true,
            //   autoClose: false,
            //   icon: <Spinner />,
            // });
            if (toastId.current === null) {
              toastId.current = toast.info("signing in", {
                position: "top-right",
                hideProgressBar: true,
                autoClose: false,
                icon: <Spinner />,
              });
            }
            // } else {
            //   toast.update(toastId.current, { progress });
            // }
            const { email, password } = values;
            try {
              const { user, session, error } = await supabase.auth.signIn({
                email: email,
                password,
              });
              if (user) {
                const { data: profile } = await supabase
                  .from("usermeta")
                  .select("*")
                  .match({ id: user.id })
                  .single();

                toast.update(toastId.current, {
                  render: `Successful`,
                  icon: <AiFillCheckCircle size={20} color="green" />,
                  hideProgressBar: false,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 2000,
                  position: "top-right",
                });

                // setSession(session);
                resetForm({ email: "", password: "" });
                setCookie(
                  "user",
                  JSON.stringify({ user: user, profile: profile }),
                  {
                    path: "/",
                    maxAge: 3600,
                    sameSite: true,
                  }
                );
                Router.push("/");
              }
              if (error) {
                // toast.done(toastId.current);
                // toast.error(`${error?.message}`, { position: "top-right" });
                toast.update(toastId.current, {
                  render: `${error?.message}`,
                  icon: <MdOutlineError size={20} color="red" />,
                  hideProgressBar: false,
                  type: toast.TYPE.ERROR,
                  autoClose: 2000,
                  position: "top-right",
                });
              }
            } catch (error) {
              toast.update(toastId.current, {
                render: `${error?.message}`,
                icon: <MdOutlineError size={20} color="red" />,
                hideProgressBar: false,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
                position: "top-right",
              });
            }
            resetForm({
              password: "",
              email: "",
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
              <Form className="">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border border-gray-400 px-3 py-2 w-full rounded bg-transparent"
                    type="email"
                    id="email"
                    value={values.email}
                    placeholder="Enter email"
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="w-full relative">
                    <input
                      className="border border-gray-400 px-3 py-2 w-full rounded bg-transparent"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={values.password}
                      placeholder="Enter password"
                      onChange={handleChange("password")}
                    />
                    <span
                      className="absolute right-2 top-2 text-sm cursor-pointer text-gray-500"
                      onClick={() => togglePassword((prev) => !prev)}
                    >
                      {showPassword ? "hide" : "show"}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#0e927a] hover:bg-[#0e8c75] text-white p-2 rounded w-full"
                >
                  Login
                </button>
                <div className="my-2 cursor-pointer text-[#0e927a] text-sm">
                  <Link href="/password">Forgot password</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;

// export const getServerSideProps = async ({ req, res }) => {
//   const userData = parseCookies(req);

//   if (userData?.user) {
//     // If no user, redirect to index.
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//       props: {},
//     };
//   }

//   return {
//     props: {},
//   };
// };

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    // If no user, redirect to index.
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  // If there is a user, return it.
  return { props: { user } };
}
