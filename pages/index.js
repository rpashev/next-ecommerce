import { Fragment } from "react";
import BestSellers from "../components/landing-page/best-sellers";
import Features from "../components/landing-page/features";
import FinalPrompt from "../components/landing-page/final-prompt";
import HomeIntro from "../components/landing-page/home-intro";
import Newsletter from "../components/landing-page/newsletter";

export default function Home() {
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
