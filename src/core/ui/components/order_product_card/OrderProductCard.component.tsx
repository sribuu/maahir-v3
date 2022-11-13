import clsx from "clsx";
import React from "react";
import CounterComponent from "../counter/Counter.component";

export interface IOrderProductCardComponentProps {
  productSrc?: string;
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  quantity?: number;
  onSubstract?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAdd?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
OrderProductCardComponent.defaultProps = {
  productSrc: "",
  name: "Paket Reseller Parfum",
  minPrice: "Rp 8.000",
  maxPrice: "10.000",
  price: "Rp 49.999",
  quantity: 0,
};

export default function OrderProductCardComponent(
  props: IOrderProductCardComponentProps
) {
  const description: string = `Harga jual satuan ${props.minPrice} - ${props.maxPrice}`;
  const handleSubstract = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSubstract) {
      props.onSubstract(e);
    }
  };

  const handleSummation = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onAdd) {
      props.onAdd(e);
    }
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "gap-x-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      <img
        src={props.productSrc}
        className={clsx("rounded-lg w-[7.5rem] h-[6.875rem]")}
      />

      {/* content */}
      <div className={clsx("grid gap-y-[1rem] grid-cols-1 rounded-2xl")}>
        <div className={clsx("grid gap-y-[0.125rem] grid-cols-1")}>
          <p className={clsx("text-base text-dark-charcoal font-bold")}>
            {props.name}
          </p>
          <p className={clsx("text-[0.875rem] text-taupe-gray font-regular")}>
            {description}
          </p>
        </div>

        <p className={clsx("text-base text-charleston-green font-bold")}>
          {props.price}
        </p>
      </div>

      <CounterComponent
        quantity={props.quantity}
        onSubstract={handleSubstract}
        onSummation={handleSummation}
      />
    </div>
  );
}
