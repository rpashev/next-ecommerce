import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        <Layout>
          <Head></Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
