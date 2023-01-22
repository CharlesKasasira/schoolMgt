import Link from "next/link";
import React, { useState } from "react";
import Head from "next/head";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";
import { Formik, Form, ErrorMessage } from "formik";
import Spinner from "../components/Spinner";
import { MdOutlineError, MdErrorOutline } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { passwordSchema } from "../utils/validators";
import { toast } from "react-toastify";

function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password - School Management System</title>
      </Head>
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const { email } = values;
            try {
              const { data, error } =
                await supabase.auth.api.resetPasswordForEmail(email, {
                  redirectTo: "https://schoolmgt.vercel.app/update-password",
                });

              if (data) {
                toast.success(`A Reset Password Email has been sent`, {
                  position: "top-center",
                });
              }
              if (error) {
                toast.error(`${error?.message}`, { position: "top-center" });
              }
              resetForm({ email: "", password: "" });
              Router.push("/");
            } catch (error) {
              toast.error(`${error?.message}`, { position: "top-center" });
            }
            resetForm({
              email: "",
            });
          }}
          validationSchema={passwordSchema}
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
                  Reset Password
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

                <button
                  type="submit"
                  className="bg-[#10a37f] hover:bg-[#0e8c75] text-white p-2 rounded-sm w-full"
                >
                  Reset password
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

export default ResetPassword;

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
