import SideMenu from "./SideMenu";
import Head from "next/head";

function Layout({ children, ...customProps }) {
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
