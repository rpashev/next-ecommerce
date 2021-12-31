import { Fragment } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";
import MobileNav from "../components/layout/mobile-nav";

export default function Home() {
  return (
    <Fragment>
      <MobileNav />
      <HomeIntro />
      <Newsletter />
      <BestSellers />
    </Fragment>
  );
}
