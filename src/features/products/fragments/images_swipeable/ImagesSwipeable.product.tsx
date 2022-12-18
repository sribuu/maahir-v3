import React, { useState, useRef, useEffect } from "react";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import clsx from "clsx";

export interface IImagesSwipeableProductProps {}

export default function ImagesSwipeableProduct(
  props: IImagesSwipeableProductProps
) {
  const [active, setActive] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [startX, setStartX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [boundaries, setBoundaries] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setBoundaries(ref.current.clientWidth / 2);
    }
  }, [ref.current]);
  const images = [
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/lemonilo-logo.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/36300c22-bc48-478e-b128-7c395a6d7263.jpeg",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/yellowfit-logo.jpg",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/96756fff-aad5-44e6-b44f-71ee984a9783.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/segari-logo.png",
    "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/maahir-products/2022/12/12/be2ea728-9d16-4909-91d1-3308269deb31.png",
  ];

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    const changeX = e.touches[0].clientX;
    const final = -(ref.current.clientWidth * active) + (changeX - startX);

    setTranslate(final);
    setLastX(changeX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    const finalActive =
      startX > lastX && startX - lastX > boundaries
        ? active + 1
        : lastX > startX && lastX - startX > boundaries
        ? active - 1
        : active;
    const finalTranslate = finalActive * -ref.current.clientWidth;

    setTranslate(finalTranslate);
    setActive(finalActive);
  };

  return (
    <div className={clsx("relative", "grid grid-cols-1", "w-full")}>
      <div
        className={clsx(
          "w-[2rem] h-[2rem] rounded-[50%]",
          "bg-black-20",
          "backdrop-blur-[10px]",
          "absolute top-[0.875rem] left-[1rem]",
          "px-[0.25rem] py-[0.25rem]",
          "box-border"
        )}
      >
        <NavigationIcon
          className={clsx("w-[1.25rem] h-[1.25rem]", "fill-white")}
        />
      </div>

      <div
        className={clsx("flex items-start justify-start", "overflow-hidden")}
      >
        {images.map((item, index) => (
          <img
            key={index}
            ref={ref}
            src={item}
            className={clsx("min-w-[100vw] h-[270px]", "object-cover")}
            style={{ transform: `translate3d(${translate}px, 0px, 0px)` }}
            // style={{ transform: `translate3d(-180px, 0px, 0px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        ))}
      </div>

      <div
        className={clsx(
          "w-[42px] h-[1.5rem] rounded-[8px]",
          "bg-black-20",
          "backdrop-blur-[10px]",
          "absolute bottom-[1rem] left-[1rem]",
          "px-[0.625rem] py-[0.125rem]",
          "box-border"
        )}
      >
        <p className={clsx("text-white text-[0.75rem] font-medium")}>{`${
          active + 1
        }/10`}</p>
      </div>
    </div>
  );
}
