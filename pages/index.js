import { Fragment } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import HomeCarousel from "../components/landing-page/carousel";
import Newsletter from "../components/landing-page/newsletter";

export default function Home() {
  return (
    <Fragment>
      <HomeCarousel />
      <Newsletter />
      <BestSellers />
    </Fragment>
  );
}
