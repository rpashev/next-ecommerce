"use client";
import { Fragment } from "react";
import Footer from "./footer";
import Header from "./header";

export const Layout = (props) => {
  // TODO: cart logic ?

  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
