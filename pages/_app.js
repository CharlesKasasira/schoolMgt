import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../styles/Progress.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
