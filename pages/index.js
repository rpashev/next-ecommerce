import { Fragment, useEffect } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
import axios from "axios";

export default function Home() {
  // useEffect(() => {  //pushing all products to mongo
  //   axios
  //     .post("/api/products")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Fragment>
      <HomeIntro />
      <BestSellers />
      <Newsletter />
      <Features />
      <FinalPrompt />
    </Fragment>
  );
}
