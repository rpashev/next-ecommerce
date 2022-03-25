import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../store";
import Layout from "../components/layout/layout";
import Head from "next/head";

import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider session={pageProps.session}>
          <Layout>
            <Head></Head>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default MyApp;
