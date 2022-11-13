import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";

export interface IHighlightProductCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  advantage?: string;
  productSrc?: string;
  productAlt?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

HighlightProductCard.defaultProps = {
  name: "Paket Reseller Setelan Rayon",
  description: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  advantage: "Potensi keuntungan mulai dari Rp20.000",
  productSrc: "/images/sample-product.png",
};

export default function HighlightProductCard(
  props: IHighlightProductCardProps
) {
  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <div className={clsx("grid gap-y-5 p-6 rounded-2xl shadow-1", "bg-white")}>
      <img
        src={props.productSrc}
        width={312}
        height={312}
        loading={"lazy"}
        className={clsx("object-cover rounded-lg w-[312px] h-[312px]")}
      />

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
        <p>{props.description}</p>
      </div>

      <ButtonComponent
        id={props.id}
        intent={"secondary"}
        size={"medium"}
        onClick={handleClickBuyNow}
      >
        {"Beli Sekarang"}
      </ButtonComponent>
    </div>
  );
}
