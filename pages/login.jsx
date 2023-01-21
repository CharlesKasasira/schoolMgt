import React, { useState, useRef } from "react";
import Link from "next/link";
import { Formik, Form, ErrorMessage } from "formik";
import { useAuth } from "../utils/auth";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import Head from "next/head";
import Spinner from "../components/Spinner";
import { MdOutlineError } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { parseCookies } from "../utils/parseCookies";
import { BiHide, BiShow } from "react-icons/bi";
import { loginSchema } from "../utils/validators";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const { setSession } = useAuth();
  const [cookie, setCookie] = useCookies(["user"]);
  const [showPassword, setShowPassword] = useState(false);

  const toastId = useRef(null);

  return (
    <>
      <Head>
        <title>Welcome - School Management System</title>
      </Head>
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            if (toastId.current === null) {
              toastId.current = toast.info("signing in", {
                position: "top-right",
                hideProgressBar: true,
                autoClose: false,
                icon: <Spinner />,
              });
            }
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

                setSession(session);
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
          validationSchema={loginSchema}
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
              <Form className="md:w-72">
                <h1 className="text-center text-2xl font-medium mb-5">
                  Welcome Back
                </h1>
                <div className="mt-3 mb-3 w-full">
                  <div className="mt-10 mb-1 relative w-full flex flex-col">
                    <input
                      type="email"
                      id="email"
                      className="block px-2.5 pb-2.5 pt-4 w-full border-[#b1b5bb] text-gray-900 bg-transparent rounded-sm appearance-none focus:outline-none peer focus:ring-0 focus:border-black border-[.9px] focus:border-[1px]"
                      required
                      placeholder=" "
                      name="email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />

                    <label
                      htmlFor="email"
                      className="absolute duration-300 transform -translate-y-4 scale-95 top-2 z-10 text-gray-500 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-95 peer-focus:-translate-y-4 left-1 pointer-events-none"
                    >
                      Email
                    </label>
                  </div>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="text-xs text-red-500 text-left w-full mb-2">
                        <p className="flex items-center gap-1">
                          <MdErrorOutline />
                          {msg}
                        </p>
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="mt-3 mb-3 w-full">
                  <div className="relative mb-1 w-full flex flex-col">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="block px-2.5 pb-2.5 pt-4 w-full border-[#b1b5bb] text-gray-900 bg-transparent rounded-sm appearance-none focus:outline-none peer focus:ring-0 focus:border-black border-[.9px] focus:border-[1px]"
                      required
                      placeholder=" "
                      name="password"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />

                    <i
                      className="absolute right-2.5 top-[20%] cursor-pointer hover:bg-gray-100 px-1 py-1 font-light rounded text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <BiHide color="#b1b5bb" size={20} />
                      ) : (
                        <BiShow color="#b1b5bb" size={20} />
                      )}
                    </i>

                    <label
                      htmlFor="password"
                      className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-95 peer-focus:-translate-y-4 left-1 pointer-events-none"
                    >
                      Password
                    </label>
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-xs text-red-500 text-left w-full mb-2">
                        <p className="flex items-center gap-1">
                          <MdErrorOutline />
                          {msg}
                        </p>
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <button
                  type="submit"
                  className="bg-[#10a37f] hover:bg-[#0e8c75] text-white p-2 rounded-sm w-full"
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

export async function getServerSideProps({ req, res }) {
  const person = parseCookies(req);
  if (person?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  // If there is a user, return it.
  return { props: {} };
}
