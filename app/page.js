// "use-client";
import { Fragment } from "react";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
import ProductList from "../components/products/product-list";

import { getByField } from "../lib/products";

let products = await getByField({ bestSeller: true });

export default function Home() {
  return (
    <Fragment>
      <HomeIntro />
      <ProductList products={products} title="Popular right now" />
      <Newsletter />
      <Features />
      <FinalPrompt />
    </Fragment>
  );
}
