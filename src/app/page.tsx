import Banner from "../components/common/Banner";
import CategoriesSection from "../components/CategoriesSection";
import GetAccessToday from "../components/common/GetAccessToday";
import HowItWorks from "../components/common/HowItWorks";
import UnlockPotential from "../components/common/UnlockPotential";
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
