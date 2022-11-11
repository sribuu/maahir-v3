import { useContext } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import HighlightProductCard from "@/src/core/ui/components/highlight_product_card/HighlightProductCard.component";
import { HomeContext } from "../../contexts/Home.context";
import { PRODUCT_LINK } from "@/src/core/lib/constants";
import { fetchTopThreeViralProducts } from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IHeroHomeProps {}

export default function HeroHome(props: IHeroHomeProps) {
  const { state } = useContext(HomeContext);
  const { data: topThreeViralProductsData } = useQuery<IProducts[]>({
    queryKey: ["maahir-top-three-viral-products"],
    queryFn: fetchTopThreeViralProducts,
  });
  return (
    <section
      className={clsx(
        "grid justify-center content-start justify-items-center",
        "relative",
        "py-[252px] gap-y-12 min-h-[68.625rem]",
        "bg-gradient-to-r from-caribbean-green to-mauve"
      )}
    >
      {/* lines */}
      <img
        className={clsx("absolute top-32 left-0")}
        src={"/lines/left-curve.svg"}
      />

      <img
        className={clsx("absolute top-28 right-0")}
        src={"/lines/right-curve.svg"}
      />
      {/* products */}
      <img
        className={clsx("animate-slideRight", "absolute top-[15rem] left-0")}
        src={"/images/maahir-product-1.svg"}
      />
      <img
        className={clsx(
          "animate-slideLeft",
          "absolute top-[20.125rem] right-0"
        )}
        src={"/images/maahir-product-2.svg"}
      />
      {/* content */}
      <div
        className={clsx(
          "grid justify-center justify-items-center max-w-[48rem] gap-y-8"
        )}
      >
        <h1
          className={clsx(
            "animate-fadeIn",
            "text-[3.75rem] font-bold text-center",
            "text-white"
          )}
        >
          {state.hero.headline}
        </h1>

        <p
          className={clsx(
            "animate-fadeIn",
            "text-[1.5rem] font-regular text-center",
            "text-white"
          )}
        >
          {state.hero.description}
        </p>
      </div>
      <ButtonComponent intent={"primary"} size={"medium"}>
        {state.hero.cta_button.label}
      </ButtonComponent>

      <Link href={PRODUCT_LINK}>
        <p
          className={clsx(
            "text-base font-bold text-center",
            "text-ocean-boat-blue",
            "absolute bottom-[-30rem] left-[50%] translate-x-[-50%]"
          )}
        >
          {"Lihat Semua Produk"}
        </p>
      </Link>

      <div
        className={clsx(
          "grid justify-center justify-items-center gap-x-8",
          topThreeViralProductsData.length >= 3
            ? "grid-cols-3"
            : `grid-cols-${topThreeViralProductsData.length}`,
          "absolute bottom-[-420px] z-10"
        )}
      >
        {topThreeViralProductsData.map((item, index) => (
          <HighlightProductCard
            key={index}
            name={item.title}
            productSrc={item.image}
            description={item.description}
            price={thousandSeparator(item.price)}
          />
        ))}
      </div>

      <p
        className={clsx(
          "text-[2.25rem] font-bold text-center",
          "text-white",
          "absolute bottom-[10rem]"
        )}
      >
        {"Product jualan paling viral buat kamu"}
      </p>
    </section>
  );
}
