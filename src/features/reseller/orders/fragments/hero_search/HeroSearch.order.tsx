import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IHeroSearchOrderProps {
  illustration?: string;
  message?: string;
  description?: string;
}

HeroSearchOrder.defaultProps = {
  illustration: "/illustrations/start-search-order.svg",
  message: "Mulai pencarian mu dengan mengetikkan keyboard",
  description:
    'Misalnya, ketik "ID023456" untuk mencari semua yang terkait dengannya',
};

export default function HeroSearchOrder(props: IHeroSearchOrderProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center justify-items-center",
        "gap-y-[2rem] w-full"
      )}
    >
      <img src={props.illustration} />
      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center",
          "gap-y-[0.75rem] w-full"
        )}
      >
        <p className={clsx("text-[1.5rem] text-dark-charcoal font-bold")}>
          {props.message}
        </p>
        <p className={clsx("text-base text-independence font-regular")}>
          {props.description}
        </p>
      </div>
    </div>
  );
}
