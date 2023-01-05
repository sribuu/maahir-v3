import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { ResellerHomeContext } from "../../contexts/Home.context";
import { ExternalLink } from "@/src/core/lib/constants";
import { useResellerHomeGetViralProducts } from "@/src/features/home/hooks/useViralProducts";
import { ResellerHomeIdNames } from "../../constants";

export interface IHeroSectionHomeProps {
  heroRef?: (node?: Element) => void;
}

export default function HeroSectionHome(props: IHeroSectionHomeProps) {
  const { isLoading: isLoadingGetViralProducts } =
    useResellerHomeGetViralProducts();

  if (isLoadingGetViralProducts) {
    return <div></div>;
  }

  return (
    <section
      ref={props.heroRef}
      className={clsx(
        "grid justify-center content-start justify-items-center",
        "relative",
        "py-[124px] sm:py-[252px] min-h-[470px] sm:min-h-[68.625rem] w-full",
        "overflow-hidden"
      )}
      style={{
        background:
          "linear-gradient(283.71deg, #00D6A1 -7.08%, #D8A7FF 127.02%)",
      }}
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
        className={clsx(
          "animate-slideRight",
          "absolute top-[15rem] left-0",
          "hidden sm:block",
          ""
        )}
        src={"/images/maahir-product-1.svg"}
      />
      <img
        className={clsx(
          "animate-slideLeft",
          "absolute",
          "top-[120px] sm:top-[20.125rem] right-[-30px] sm:right-[0rem]",
          "w-[124px] h-[180px] sm:w-[484px] sm:h-[510px]"
        )}
        src={"/images/maahir-product-2.svg"}
      />
      {/* content */}
      <div
        className={clsx(
          "grid justify-center justify-items-center gap-y-[0.75rem] sm:gap-y-[3rem]",
          "max-w-[308px] sm:max-w-[36rem] md:max-w-[48rem]",
          "absolute top-[82px] sm:top-[282px]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.375rem] sm:gap-y-[2rem] place-content-center place-item-center",
            "w-full"
          )}
        >
          <h1
            className={clsx(
              "animate-fadeIn",
              "text-[1.25rem] sm:text-[3.75rem]",
              "font-bold text-center",
              "text-white"
            )}
          >
            {"Siap Jualan Produk Viral Dari Mana Aja, Kapan Aja!"}
          </h1>

          <p
            className={clsx(
              "animate-fadeIn",
              "font-regular text-center",
              "text-[0.875rem] sm:text-[1.5rem]",
              "text-white"
            )}
          >
            {"Mau mulai jualan sekarang?"}
          </p>
        </div>

        <Link href={ExternalLink.WhatsApp} target={"_blank"}>
          <button
            id={ResellerHomeIdNames.JoinSellerGroupWithMaahir}
            className={clsx(
              "px-[0.75rem] sm:px-[0.875rem] py-[0.25rem] sm:py-[0.875rem]",
              "rounded-[0.5rem] sm:rounded-[0.75rem]",
              "bg-ocean-boat-blue"
            )}
          >
            <p className={clsx("text-white text-[0.875rem] font-bold")}>
              {"Gabung grup jualan Di Maahir"}
            </p>
          </button>
        </Link>
      </div>
    </section>
  );
}
