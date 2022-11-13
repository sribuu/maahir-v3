import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";

export interface IYourOrderCardComponentProps {
  title?: string;
  productSrc?: string;
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  quantity?: number;
  disabled?: boolean;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
YourOrderCardComponent.defaultProps = {
  title: "Pesanan Kamu",
  productSrc: "",
  name: "Paket Reseller Parfum",
  minPrice: "Rp 8.000",
  maxPrice: "10.000",
  price: "Rp 49.999",
  quantity: 0,
  disabled: true,
};

export default function YourOrderCardComponent(
  props: IYourOrderCardComponentProps
) {
  const description: string = `Harga jual satuan ${props.minPrice} - ${props.maxPrice}`;
  const quantity: string = `${props.quantity} ${
    props.quantity > 1 ? "items" : "item"
  }`;
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSubmit) {
      props.onSubmit(e);
    }
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      <p className={clsx("text-base text-dark-charcoal font-bold")}>
        {props.title}
      </p>
      <img
        src={props.productSrc}
        className={clsx("rounded-lg w-[26.875rem] h-[16.125rem]")}
      />

      <div className={clsx("grid gap-y-[1.25rem] grid-cols-1 rounded-2xl")}>
        <div className={clsx("grid gap-y-[0.125rem] grid-cols-1")}>
          <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
            {props.name}
          </p>

          <div>
            <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
              {description}
            </p>
            <p
              className={clsx("text-[1rem] text-charleston-green font-regular")}
            >
              <span
                className={clsx("text-[1rem] text-taupe-gray font-regular")}
              >{`Qty: `}</span>
              {quantity}
            </p>
          </div>
        </div>
      </div>

      <p className={clsx("text-base text-charleston-green font-bold")}>
        {props.price}
      </p>

      <ButtonComponent
        disabled={props.disabled}
        intent={"primary"}
        onClick={handleSubmit}
      >
        {"Lanjutkan Pembayaran"}
      </ButtonComponent>
    </div>
  );
}
