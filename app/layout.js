"use client";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../store";
import { Layout } from "../components/Layout/layout";
import Head from "next/head";

import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function RootLayout({ children, session }) {
  let persistor = persistStore(store);

  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Head>
              <title>MyShop</title>
            </Head>
            <Layout>{children}</Layout>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
