import Banner from "../components/Banner";
import CategoriesSection from "../components/CategoriesSection";
import GetAccessToday from "../components/GetAccessToday";
import HowItWorks from "../components/HowItWorks";
import UnlockPotential from "../components/UnlockPotential";
import TutorsPage from "./tutors/page";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <TutorsPage />
      <CategoriesSection />
      <HowItWorks />
      <UnlockPotential />
      <GetAccessToday />
    </div>
  );
}
