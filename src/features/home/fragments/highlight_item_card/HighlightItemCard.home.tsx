import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IHighlightItemCardHomeProps {
  id?: string;
  name?: string;
  profitValue?: string;
  price?: string;
  advantage?: string;
  productSrc?: string;
  productAlt?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

HighlightItemCardHome.defaultProps = {
  name: "Paket Reseller Setelan Rayon",
  profitValue: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  advantage: "Potensi keuntungan mulai dari Rp20.000",
  productSrc: "/images/sample-product.png",
};

export default function HighlightItemCardHome(
  props: IHighlightItemCardHomeProps
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
        <p
          className={clsx("text-[0.875rem] font-regular text-independence")}
        >{`Potensi keuntungan mulai dari ${props.profitValue}`}</p>
      </div>

      <ButtonComponent
        id={props.id}
        intent={"primary"}
        size={"medium"}
        onClick={handleClickBuyNow}
      >
        {"Beli Sekarang"}
      </ButtonComponent>

      <ButtonComponent
        id={props.id}
        intent={"secondary"}
        size={"medium"}
        onClick={handleClickBuyNow}
      >
        <img src={"/icons/add-to-cart-blue.svg"} />
        {"Keranjang"}
      </ButtonComponent>
    </div>
  );
}
