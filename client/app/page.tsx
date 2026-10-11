import Venue from "./components/Venue";
import EssentialInfo from "./section/landing/EssentialInfo";
import Expectation from "./section/landing/Expectation";
import FinalCTA from "./section/landing/FinalCTA";
import Hero from "./section/landing/Hero";
import Overview from "./section/landing/Overview";
import ScrollMotion from "./components/ScrollMotion";

export default function Home() {
  return (
    <div>
      <ScrollMotion />
      <Hero/>
      <Venue />
      <Overview />
      <Expectation />
      <EssentialInfo />
      <FinalCTA />
    </div>


  );
}
