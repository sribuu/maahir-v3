import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import HighlightProductCard from "@/src/features/home/fragments/highlight_item_card/HighlightItemCard.home";
import { ResellerHomeContext } from "../../contexts/Home.context";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import {
  useResellerHomeGetViralProducts,
  useResellerHomeAddViralProductToCart,
} from "@/src/features/home/hooks/useViralProducts";

export interface IHeroSectionHomeProps {
  heroRef?: (node?: Element) => void;
}

export default function HeroSectionHome(props: IHeroSectionHomeProps) {
  const router = useRouter();
  const { state } = useContext(ResellerHomeContext);

  const { isLoading: isLoadingGetViralProducts } =
    useResellerHomeGetViralProducts();

  // add to cart
  const { mutate: addViralProductToCart } =
    useResellerHomeAddViralProductToCart();

  const handleAddToCart = (data: number) => {
    addViralProductToCart(data);
  };

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: parseInt(e.currentTarget.id) },
    });
  };

  if (isLoadingGetViralProducts) {
    return <div></div>;
  }

  return (
    <section
      ref={props.heroRef}
      className={clsx(
        "grid justify-center content-start justify-items-center",
        "relative",
        "py-[252px] gap-y-12 min-h-[68.625rem] w-full",
        "bg-gradient-to-r from-mauve to-caribbean-green bg-cover"
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
          {"Siap Jualan Produk Viral Dari Mana Aja, Kapan Aja!"}
        </h1>

        <p
          className={clsx(
            "animate-fadeIn",
            "text-[1.5rem] font-regular text-center",
            "text-white"
          )}
        >
          {"Mau mulai jualan sekarang?"}
        </p>
      </div>
      <ButtonComponent intent={"primary"} size={"large"}>
        {"Gabung grup jualan Di Maahir"}
      </ButtonComponent>

      <Link href={RouterPathName.AllProducts}>
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
          "grid justify-center justify-items-center",
          "gap-x-8 gap-y-[3rem]",
          "absolute bottom-[-420px] z-10"
        )}
      >
        <p
          className={clsx("text-[2.25rem] font-bold text-center", "text-white")}
        >
          {"Product jualan paling viral buat kamu"}
        </p>
        <div
          className={clsx(
            "grid justify-center justify-items-center gap-x-8",
            state.viral_products.length >= 3
              ? "grid-cols-3"
              : `grid-cols-${state.viral_products.length}`
          )}
        >
          {state.viral_products.map((item, index) => (
            <HighlightProductCard
              key={index}
              id={String(item.id)}
              name={item.name}
              productSrc={item.image}
              profitValue={item.profit}
              price={item.price}
              onClick={handleClickBuyNow}
              onClickAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
