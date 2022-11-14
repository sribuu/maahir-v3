import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IYourOrderCardSummaryProps {
  title?: string;
  productSrc?: string;
  name?: string;

  price?: string;
  quantity?: number;
  disabled?: boolean;
  totalPrice?: string;
  deliveryPrice?: string;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

YourOrderCardSummary.defaultProps = {
  title: "Pesanan Kamu",
  productSrc: "",
  name: "Paket Reseller Parfum",

  price: "Rp 49.999",
  totalPrice: "Rp 49.999",
  deliveryPrice: "Rp 3.000",
  quantity: 0,
  disabled: true,
};

export default function YourOrderCardSummary(
  props: IYourOrderCardSummaryProps
) {
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
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-base text-dark-charcoal font-bold")}>
          {props.title}
        </p>
        <button onClick={props.onEdit}>
          <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
            {"UBAH DETAIL"}
          </p>
        </button>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1",
          "rounded-2xl",
          "border border-bright-gray"
        )}
      >
        <img
          src={props.productSrc}
          className={clsx("rounded-lg w-[26.875rem] h-[16.125rem]")}
        />

        {/* below image information */}
        <div className={clsx("grid gap-y-[1.25rem] grid-cols-1", "p-4")}>
          <div className={clsx("grid gap-y-[0.25rem] grid-cols-1")}>
            <div className={clsx("flex justify-between w-full")}>
              <p
                className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}
              >
                {props.name}
              </p>

              <p
                className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}
              >
                {props.price}
              </p>
            </div>

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

      <div className={clsx("flex  justify-between", "items-center", "w-full")}>
        <div className={clsx("grid  grid-cols-1", "w-fit")}>
          <p className={clsx("text-[1rem] text-independence font-regular")}>
            {"Subtotal"}
          </p>
          <p className={clsx("text-[0.75rem] text-taupe-gray font-regular")}>
            {`x${quantity}`}
          </p>
        </div>

        <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
          {props.totalPrice}
        </p>
      </div>

      <div className={clsx("flex  justify-between", "w-full")}>
        <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
          {"Biaya Pengiriman"}
        </p>

        <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
          {props.deliveryPrice}
        </p>
      </div>

      <ButtonComponent
        disabled={props.disabled}
        intent={"primary"}
        onClick={handleSubmit}
      >
        {"Bayar Sekarang"}
      </ButtonComponent>
    </div>
  );
}
