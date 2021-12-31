import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head></Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
