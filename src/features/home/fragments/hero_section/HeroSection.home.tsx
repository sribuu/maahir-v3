import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import HighlightProductCard from "@/src/features/home/fragments/highlight_item_card/HighlightItemCard.home";
import { HomeContext } from "../../contexts/Home.context";
import {
  PRODUCT_LINK,
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import { fetchTopThreeViralProducts } from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IHeroSectionHomeProps {
  heroRef?: (node?: Element) => void;
}

export default function HeroSectionHome(props: IHeroSectionHomeProps) {
  const router = useRouter();
  const { state } = useContext(HomeContext);
  const {
    data: topThreeViralProductsData,
    isSuccess: topThreeViralProductsDataIsSuccess,
  } = useQuery<IProducts[]>({
    queryKey: [ReactQueryKey.GetTopThreeViralProducts],
    queryFn: fetchTopThreeViralProducts,
  });

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: parseInt(e.currentTarget.id) },
    });
  };
  return (
    <section
      ref={props.heroRef}
      className={clsx(
        "grid justify-center content-start justify-items-center",
        "relative",
        "py-[252px] gap-y-12 min-h-[68.625rem]",
        "bg-gradient-to-r from-mauve to-caribbean-green"
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
      <ButtonComponent intent={"primary"} size={"large"}>
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

      {topThreeViralProductsDataIsSuccess && (
        <div
          className={clsx(
            "grid justify-center justify-items-center",
            "gap-x-8 gap-y-[3rem]",
            "absolute bottom-[-420px] z-10"
          )}
        >
          <p
            className={clsx(
              "text-[2.25rem] font-bold text-center",
              "text-white"
            )}
          >
            {"Product jualan paling viral buat kamu"}
          </p>
          <div
            className={clsx(
              "grid justify-center justify-items-center gap-x-8",
              topThreeViralProductsData.length >= 3
                ? // "md:grid-cols-1 lg:grid-cols-3"
                  "grid-cols-3"
                : `grid-cols-${topThreeViralProductsData.length}`
            )}
          >
            {topThreeViralProductsData.map((item, index) => (
              <HighlightProductCard
                key={index}
                id={String(item.id)}
                name={item.title}
                productSrc={item.image}
                profitValue={thousandSeparator(item.profit_value)}
                price={thousandSeparator(item.price)}
                onClick={handleClickBuyNow}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
