import { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import HomeLayout from "@/src/core/ui/layouts/reseller/home/Home.layout";
import HeroSectionHome from "../../fragments/hero_section/HeroSection.home";
import FAQSectionHome from "../../fragments/faq_section/FAQSection.home";

import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { useResellerHomeGetViralProducts } from "../../hooks/useHomeGetProducts";
import { ResellerHomeContext } from "../../contexts/Home.context";
import HighlightProductCardHome from "../../fragments/highlight_item_card/HighlightItemCard.home";
import { ResellerHomeIdNames } from "../../constants";
import { useResellerHomeAddToCart } from "../../hooks/useHomeAddToCart";
import { useResellerCheckoutGetCheckoutItems } from "@/src/features/reseller/orders/hooks/useGetCheckoutItems";
import { useResellerHomeAddToCheckout } from "../../hooks/useHomeAddToCheckout";

export interface IHomeContainerProps {}

export default function HomeContainer(props: IHomeContainerProps) {
  const { ref, inView } = useInView();
  const router = useRouter();
  const { state } = useContext(ResellerHomeContext);
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

  const { isLoading: isLoadingGetViralProducts } =
    useResellerHomeGetViralProducts();

  // add to cart
  const { mutate: addToCart } = useResellerHomeAddToCart();
  const { mutate: checkoutItem } = useResellerHomeAddToCheckout();

  const handleAddToCart = (data: number) => {
    addToCart(data);
  };

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isHasVariant = state.viral_products.filter(
      (item) => item.id === e.currentTarget.value
    )[0].haveVariant;
    if (isHasVariant) {
      router.push({
        pathname: RouterPathName.ProductDetail,
        query: {
          [RouterQueryKey.ProductId]: e.currentTarget.value,
        },
      });
    } else {
      checkoutItem(parseInt(String(e.currentTarget.value)));
    }
  };

  const handleClickItem = (data: number) => {
    router.push({
      pathname: RouterPathName.ProductDetail,
      query: {
        [RouterQueryKey.ProductId]: data,
      },
    });
  };

  if (isLoadingGetViralProducts) {
    return <div></div>;
  }

  return (
    <HomeLayout variant={navbarVariant}>
      <HeroSectionHome heroRef={ref} />

      <div
        className={clsx(
          "grid justify-center justify-items-center",
          "gap-x-8 gap-y-[1.5rem] sm:gap-y-[3rem]",
          "absolute z-10",
          "top-[310px] sm:top-[880px]",
          "left-[50%]",
          "translate-x-[-50%] sm:translate-x-[-50%]",
          "max-w-[100%]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid justify-center justify-items-center",
            "gap-x-8 gap-y-[1.5rem] sm:gap-y-[3rem]"
          )}
        >
          <div className={clsx("w-[284px] sm:w-full")}>
            <p
              className={clsx(
                "font-bold text-center text-white",
                "text-[1.25rem] sm:text-[2.25rem]"
              )}
            >
              {"Product jualan paling viral buat kamu!"}
            </p>
          </div>

          <div
            className={clsx(
              "flex items-center justify-start sm:justify-center",
              "gap-x-[0.875rem] sm:gap-x-[2rem]",
              "w-[calc(100vw_-_2rem)] sm:w-[100%] overflow-scroll",
              state.viral_products.length >= 3
                ? "grid-cols-3"
                : `grid-cols-${state.viral_products.length}`
            )}
          >
            {state.viral_products.map((item, index) => (
              <HighlightProductCardHome
                key={index}
                id={String(item.id)}
                name={item.name}
                productSrc={item.image}
                profitValue={item.profit}
                price={item.price}
                onClickItem={handleClickItem}
                onClickBuyItem={handleClickBuyNow}
                onClickAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <Link
          id={ResellerHomeIdNames.SeeAllProduct}
          className={clsx("hidden sm:block")}
          href={RouterPathName.AllProducts}
        >
          <p
            className={clsx(
              "text-base font-bold text-center",
              "text-ocean-boat-blue"
            )}
          >
            {"Lihat Semua Produk"}
          </p>
        </Link>
      </div>

      <FAQSectionHome />
    </HomeLayout>
  );
}
