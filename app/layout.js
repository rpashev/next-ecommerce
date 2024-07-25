"use client";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "My shop",
//   description: "A dummy e-commerce application for accesories like hats, gloves, backpacks. Built with Next.js",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../store";
import { Layout } from "../components/Layout/layout";
import Head from "next/head";

import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function RootLayout({ children, session, ...pageProps }) {
  let persistor = persistStore(store);

  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={session}>
              <Head>
                <title>MyShop</title>
              </Head>
              <Layout>{children}</Layout>
            </SessionProvider>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
