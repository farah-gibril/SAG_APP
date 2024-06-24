import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from 'components/Navbar';
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KindeProvider>
      <Navbar /> 
      <Component {...pageProps} />
    </KindeProvider>
  );
}

export default MyApp;