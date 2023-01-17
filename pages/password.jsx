import Link from "next/link";
import React, { useState } from "react";
import Head from "next/head";
import { supabase } from "../utils/supabase";
import { parseCookies } from "../utils/parseCookies";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email);
  };
  return (
    <>
      <Head>
        <title>Login - School Management System</title>
      </Head>
      <div className="w-screen h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="">
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
              value={email}
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button className="bg-[#0e927a] text-white p-2 rounded hover:bg-[#0e8c75] w-full">
            Login
          </button>
          <div className="my-2 cursor-pointer text-[#0e927a] text-sm">
            <Link href="/login">Login instead</Link>
          </div>
        </form>
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
