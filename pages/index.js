import { Fragment } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";

export default function Home() {
  return (
    <Fragment>
      <HomeIntro />
      <Newsletter />
      <BestSellers />
    </Fragment>
  );
}
