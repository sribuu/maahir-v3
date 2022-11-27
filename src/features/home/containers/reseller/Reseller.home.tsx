import { useEffect, useState } from "react";
import HomeLayout from "@/src/core/ui/layouts/home/Home.layout";
import { HomeProvider } from "../../contexts/Home.context";
import { useInView } from "react-intersection-observer";
import HeroSectionHome from "../../fragments/hero_section/HeroSection.home";
import FAQSectionHome from "../../fragments/faq_section/FAQSection.home";

export interface IHomeContainerProps {}

export default function HomeContainer(props: IHomeContainerProps) {
  const { ref, inView } = useInView();
  const [navbarVariant, setNavbarVariant] = useState<"transparent" | "normal">(
    "transparent"
  );
  useEffect(() => {
    if (inView) {
      setNavbarVariant("transparent");
    } else {
      setNavbarVariant("normal");
    }
  }, [inView]);
  return (
    <HomeLayout variant={navbarVariant}>
      <HomeProvider>
        <HeroSectionHome heroRef={ref} />
        <FAQSectionHome />
      </HomeProvider>
    </HomeLayout>
  );
}
