import Head from "next/head";
import { supabase } from "../utils/supabase";
import { Formik, Form, ErrorMessage } from "formik";
import Router from "next/router";
import { useState } from "react";
import Link from "next/link";
import { parseCookies } from "../utils/parseCookies";
import { toast } from "react-toastify";
import { MdOutlineError, MdErrorOutline } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { updatePasswordSchema } from "../utils/validators";

export default function ForgotPassword() {
  const handleSubmit = async (
    event,
    { password, confirm_password },
    resetForm
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (password === confirm_password) {
        const { data, error } = await supabase.auth.update({
          password: password,
        });
        if (data) {
          setLoading(false);
          toast.success(`Successfully updated password`, {
            position: "top-center",
          });
          setTimeout(() => {
            Router.push("/login");
          }, 1500);
        }
        if (error) {
          toast.error(`${error?.message}`, { position: "top-center" });
        }
      } else {
        toast.error(`Password didnot match`, { position: "top-center" });
      }
    } catch (error) {}

    document.resetForm.reset();
    resetForm({ password: "", confirm_password: "" });
  };

  return (
    <>
      <Head>
        <title>Password Reset - School Management System</title>
      </Head>
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          validationSchema={updatePasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            resetForm,
          }) => {
            return (
              <Form
                onSubmit={(event) => handleSubmit(event, values, resetForm)}
                className="md:w-72"
                name="resetForm"
              >
                <h1 className="text-center text-2xl font-medium mb-5">
                  Reset Password
                </h1>

                <div className="mt-3 mb-3 w-full">
                  <div className="relative mb-1 w-full flex flex-col">
                    <input
                      type="password"
                      id="password"
                      className="block px-2.5 pb-2.5 pt-4 w-full border-[#b1b5bb] text-gray-900 bg-transparent rounded-sm appearance-none focus:outline-none peer focus:ring-0 focus:border-black border-[.9px] focus:border-[1px]"
                      required
                      placeholder=" "
                      name="password"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />

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

                <div className="mt-3 mb-3 w-full">
                  <div className="relative mb-1 w-full flex flex-col">
                    <input
                      type="password"
                      id="confirm_password"
                      className="block px-2.5 pb-2.5 pt-4 w-full border-[#b1b5bb] text-gray-900 bg-transparent rounded-sm appearance-none focus:outline-none peer focus:ring-0 focus:border-black border-[.9px] focus:border-[1px]"
                      required
                      placeholder=" "
                      name="confirm_password"
                      onChange={handleChange("confirm_password")}
                      onBlur={handleBlur("confirm_password")}
                      value={values.confirm_password}
                    />

                    <label
                      htmlFor="confirm_password"
                      className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-95 peer-focus:-translate-y-4 left-1 pointer-events-none"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <ErrorMessage name="confirm_password">
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
                  Set password
                </button>
                <div className="my-2 cursor-pointer text-[#0e927a] text-sm">
                  <Link href="/login">Login instead</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

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
  return { props: { person } };
}
