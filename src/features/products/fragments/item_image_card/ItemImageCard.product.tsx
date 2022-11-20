import React, { useState } from "react";
import clsx from "clsx";

export interface IItemImageCardProductProps {
  productSrc?: string[];
}

export default function ItemImageCardProduct(
  props: IItemImageCardProductProps
) {
  const [active, setActive] = useState(0);
  const [state, setState] = useState({
    backgroundImage: `url(${props.productSrc[active]})`,
    backgroundPosition: "0% 0%",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState(
      (prevState) =>
        (prevState = { ...state, backgroundPosition: `${x}% ${y}%` })
    );
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setState(
      (prevState) =>
        (prevState = {
          ...state,
          backgroundPosition: "0% 0%",
        })
    );
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setState(
      (prevState) =>
        (prevState = {
          ...state,
          backgroundPosition: "0% 0%",
        })
    );
  };
  const handleMouseEnterImageList = (e: React.MouseEvent<HTMLImageElement>) => {
    setActive(parseInt(e.currentTarget.id));
  };

  const handleClickImageList = (e: React.MouseEvent<HTMLImageElement>) => {
    setActive(parseInt(e.currentTarget.id));
  };
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-start",
        "min-w-[276px] gap-y-[1rem]"
      )}
    >
      <figure
        className={clsx("w-[30rem] h-[30rem] rounded-[1rem]")}
        style={state}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      >
        <img
          src={props.productSrc[0]}
          className={clsx(
            "w-[30rem] h-[30rem] rounded-[1rem] hover:opacity-0 object-cover"
          )}
        />
      </figure>

      <div className={clsx("relative", "max-w-[30rem]")}>
        <div
          className={clsx(
            "relative overflow-hidden",
            "flex max-w-[30rem]",
            "gap-x-[0.75rem]"
          )}
        >
          {props.productSrc.map((item, index) => (
            <img
              id={String(index)}
              key={index}
              src={item}
              className={clsx(
                "cursor-pointer",
                "w-[86.4px] h-[86.4px] rounded-[0.5rem] object-cover",
                index === active && "border-[0.125rem] border-ocean-boat-blue"
              )}
              onClick={handleClickImageList}
              onMouseEnter={handleMouseEnterImageList}
            />
          ))}
        </div>

        <img
          src={"/icons/circle-arrow.svg"}
          className={clsx(
            "absolute top-[50%] right-[-0.75rem] translate-y-[-50%]",
            "z-20"
          )}
        />
      </div>
    </div>
  );
}
