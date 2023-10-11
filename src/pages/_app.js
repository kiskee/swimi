import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";
import Head from "next/head";

import "@aws-amplify/ui-react/styles.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "tw-elements/dist/css/tw-elements.min.css";

Amplify.configure({ ...awsExports });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SVG-Natacion</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="svgnatacion, Sergio valiente Gómez Capacitacion de cursos para entrenadores y blog de natacion"
          key="desc"
        />
        <meta name="robots" content="all" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <Navbar />
      <div className="py-24 px-16 bg-indigo-100">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
