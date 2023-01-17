import React from "react";
import SideMenu from "./SideMenu";
import Head from "next/head";
import { parseCookies } from "../utils/parseCookies";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";

function Layout({ children, user, ...customProps }) {
  const meta = {
    title: "School",
    description: "School Management system.",
    type: "website",
    ...customProps,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
      </Head>
      <ToastContainer />
      <main className="flex w-screen h-screen">
        <aside className="h-screen w-52 bg-[#fafcfe]">
          <SideMenu role="admin" />
        </aside>
        <section className="px-10 pt-4 flex-grow">{children}</section>
      </main>
    </>
  );
}

export default Layout;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  // If there is a user, return it.
  return { props: { user } };
}
