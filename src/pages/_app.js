import '@/styles/globals.css'
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";
import Head from "next/head";

import "@aws-amplify/ui-react/styles.css";
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

Amplify.configure({ ...awsExports });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SVG-Natacion</title>
      </Head>
      <Navbar />
      <div className="py-8 px-16 bg-indigo-100">
        <Component {...pageProps} />
      </div>
      <Footer />

    </>
  );
}
