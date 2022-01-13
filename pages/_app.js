import { Provider } from "next-auth/client";
import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head></Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
