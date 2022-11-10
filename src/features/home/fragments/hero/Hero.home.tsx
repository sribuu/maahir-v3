import { useContext } from "react";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { HomeContext } from "../../contexts/Home.context";

export interface IHeroHomeProps {}

export default function HeroHome(props: IHeroHomeProps) {
  const { state } = useContext(HomeContext);

  return (
    <section className={"grid justify-center gap-y-2"}>
      <h1>{state.hero.message}</h1>
      <h1>{state.hero.headline}</h1>

      <p>{state.hero.description}</p>
      <ButtonComponent className={"bg-verdigris"}>
        {state.hero.cta_button.label}
      </ButtonComponent>
    </section>
  );
}
