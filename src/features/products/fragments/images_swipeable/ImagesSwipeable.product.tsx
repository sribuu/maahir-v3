import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import clsx from "clsx";
import ImagesSwipeableComponent from "@/src/core/ui/components/images_swipeable/ImagesSwipeable.component";
import { RouterPathName } from "@/src/core/lib/constants";

export interface IImagesSwipeableProductProps {}

export default function ImagesSwipeableProduct(
  props: IImagesSwipeableProductProps
) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const images = [
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/lemonilo-logo.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/36300c22-bc48-478e-b128-7c395a6d7263.jpeg",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/yellowfit-logo.jpg",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/96756fff-aad5-44e6-b44f-71ee984a9783.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/segari-logo.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/be2ea728-9d16-4909-91d1-3308269deb31.png",
  ];

  const handleClickBack = () => {
    router.push(RouterPathName.AllProducts);
  };

  const handleSwipe = (data: number) => {
    setActive(data);
  };
  
  return (
    <div className={clsx("relative", "grid grid-cols-1", "w-full")}>
      <button
        className={clsx(
          "w-[2rem] h-[2rem] rounded-[50%]",
          "bg-black-20",
          "z-10",
          "backdrop-blur-[10px]",
          "absolute top-[0.875rem] left-[1rem]",
          "px-[0.25rem]",

          "box-border"
        )}
        onClick={handleClickBack}
      >
        <NavigationIcon
          className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
        />
      </button>

      <ImagesSwipeableComponent images={images} onSwipe={handleSwipe} />

      <div
        className={clsx(
          "w-[42px] h-[1.5rem] rounded-[8px]",
          "bg-black-20",
          "flex items-center justify-center",
          "backdrop-blur-[10px]",
          "absolute bottom-[1rem] left-[1rem]",
          "px-[0.625rem] py-[0.125rem]",
          "box-border"
        )}
      >
        <p className={clsx("text-white text-[0.75rem] font-medium")}>{`${
          active + 1
        }/${images.length}`}</p>
      </div>
    </div>
  );
}
