import SideMenu from "./SideMenu";
import Head from "next/head";
import Chat from "./Chat";

function Layout({ children, role, ...customProps }) {
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
      <Chat />
      <main className="flex w-screen h-screen">
        <aside className="h-screen w-60">
          <SideMenu />
        </aside>
        <section className="px-10 pt-4 flex-grow bg-[#f0f2f5] overflow-y-scroll">
          {children}
        </section>
      </main>
    </>
  );
}

export default Layout;
