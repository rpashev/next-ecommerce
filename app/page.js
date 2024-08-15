// "use-client";
import { Fragment } from "react";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
import ProductList from "../components/products/product-list";

import { getByField } from "../lib/products";

export const metadata = {
  title: "My Shop",
  description:
    "The place to be. Only the best products from the leading sports brands in the world - Adidas and Reebok.",
};

export default async function Home() {
  let products = await getByField({ bestSeller: true });

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
