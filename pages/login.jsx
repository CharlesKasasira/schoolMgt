import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useAuth } from "@/utils/auth";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "@/utils/supabase";
import Router from "next/router";

const LoginForm = () => {
  const { setSession } = useAuth();
  const [cookie, setCookie] = useCookies(["user"]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer />
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={async (values, { resetForm }) => {
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
              toast.error(`${error?.message}`, { position: "top-right" });
            }
          } catch (error) {
            toast.error(`${error?.message}`, { position: "top-right" });
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
                <input
                  className="border border-gray-400 px-3 py-2 w-full rounded bg-transparent"
                  type="password"
                  id="password"
                  value={values.password}
                  placeholder="Enter password"
                  onChange={handleChange("password")}
                />
              </div>
              <button
                type="submit"
                className="bg-[#0e927a] hover:bg-[#0e8c75] text-white p-2 rounded w-full"
              >
                Login
              </button>
              <div className="my-2 cursor-pointer">
                <Link href="/password">Forgot password</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
