"use-client";
import { Fragment } from "react";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
import ProductList from "../components/products/product-list";

import { getByField } from "../lib/mongo";

export default function Home(props) {
  return (
    <Fragment>
      <HomeIntro />
      <ProductList products={[]} title="Popular right now" />
      <Newsletter />
      <Features />
      <FinalPrompt />
    </Fragment>
  );
}
