import * as React from "react";
import clsx from "clsx";

export interface IHighlightProductCardProps {
  name?: string;
  price?: string;
  advantage?: string;
  productSrc?: string;
  productAlt?: string;
}

HighlightProductCard.defaultProps = {
  name: "Paket Reseller Setelan Rayon",
  price: "Rp49.999",
  advantage: "Potensi keuntungan mulai dari Rp20.000",
  productSrc: "/images/sample-product.png",
};

export default function HighlightProductCard(
  props: IHighlightProductCardProps
) {
  return (
    <div className={clsx("grid gap-y-5 p-6 rounded-2xl shadow-1", "bg-white")}>
      <img src={props.productSrc} width={312} height={312} loading={"lazy"} />

      <div className={clsx("grid gap-y-1.5")}>
        <p className={clsx("text-base text-dark-charcoal font-regular")}>
          {props.name}
        </p>
        <p className={clsx("text-[1.5rem] text-ocean-boat-blue font-bold")}>
          {props.price}
        </p>
      </div>

      <div className={clsx("flex gap-x-2")}>
        <img
          src={"/icons/verified.svg"}
          width={20}
          height={20}
          loading={"lazy"}
        />
        <p>{props.name}</p>
      </div>
    </div>
  );
}
