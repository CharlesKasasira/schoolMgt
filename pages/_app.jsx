import "../styles/globals.css";
import { AuthProvider } from "@/utils/auth";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps: { session, pageProps } }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
