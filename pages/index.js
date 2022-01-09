import { Fragment, useEffect } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
// import axios from "axios";
import { getByField } from "./lib/mongo";

export default function Home(props) {
  // useEffect(() => {  //pushing all products to mongo
  //   axios
  //     .post("/api/products")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Fragment>
      <HomeIntro />
      <BestSellers products={props.products}/>
      <Newsletter />
      <Features />
      <FinalPrompt />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const products = await getByField({ bestSeller: true });

  return {
    props: {
      products: products,
    },
    revalidate: 3600
  };
};
