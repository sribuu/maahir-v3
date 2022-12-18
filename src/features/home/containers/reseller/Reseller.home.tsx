import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeLayout from "@/src/core/ui/layouts/home/Home.layout";
import { useInView } from "react-intersection-observer";
import HeroSectionHome from "../../fragments/hero_section/HeroSection.home";
import FAQSectionHome from "../../fragments/faq_section/FAQSection.home";
import clsx from "clsx";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import {
  useResellerHomeAddViralProductToCart,
  useResellerHomeGetViralProducts,
} from "../../hooks/useViralProducts";
import { ResellerHomeContext } from "../../contexts/Home.context";
import HighlightProductCardHome from "../../fragments/highlight_item_card/HighlightItemCard.home";
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
