import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";

export interface IProductCardComponentProps {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  productSrc?: string;
  productAlt?: string;
  productRef?: (node?: Element) => void;
  //   ref?: React.RefObject<HTMLDivElement> | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

ProductCardComponent.defaultProps = {
  id: "",
  name: "Paket Reseller Setelan Rayon",
  description: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};

export default function ProductCardComponent(
  props: IProductCardComponentProps
) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <div
      ref={props.productRef}
      className={clsx("grid gap-y-5 p-6 rounded-2xl shadow-1", "bg-white")}
    >
      <img
        src={props.productSrc}
        width={244}
        height={180}
        loading={"lazy"}
        className={clsx("object-cover rounded-lg w-[244px] h-[180px]")}
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
        onClick={handleClick}
      >
        {"Beli Sekarang"}
      </ButtonComponent>
    </div>
  );
}
