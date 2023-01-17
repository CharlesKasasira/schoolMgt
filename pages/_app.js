import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../utils/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
