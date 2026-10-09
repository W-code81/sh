import Venue from "./components/Venue";
import EssentialInfo from "./section/landing/EssentialInfo";
import Expectation from "./section/landing/Expectation";
import FinalCTA from "./section/landing/FinalCTA";
import Hero from "./section/landing/Hero";
import Overview from "./section/landing/Overview";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Venue />
      <Overview />
      <Expectation />
      <EssentialInfo />
      <FinalCTA />
    </div>


  );
}
