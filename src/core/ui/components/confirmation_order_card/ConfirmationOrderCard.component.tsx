import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";
export interface IConfirmationOrderCardComponentProps {
  title?: string;
  productSrc?: string;
  name?: string;
  orderCode?: string;
  quantity?: number;

  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

ConfirmationOrderCardComponent.defaultProps = {
  title: "Pesanan Kamu",
  productSrc: "",
  name: "Paket Reseller Parfum",
  orderCode: "",
  price: "Rp 49.999",
  totalPrice: "Rp 49.999",
  deliveryPrice: "Rp 3.000",
  quantity: 0,
};

export default function ConfirmationOrderCardComponent(
  props: IConfirmationOrderCardComponentProps
) {
  const quantity: string = `${props.quantity} ${
    props.quantity > 1 ? "items" : "item"
  }`;
  const handleConfirmPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onConfirm) {
      props.onConfirm(e);
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
      </div>

      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-[1.25rem] text-independence font-regular")}>
          {"ID Pesanan"}
        </p>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.orderCode}
        </p>
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

      <ButtonComponent intent={"primary"} onClick={handleConfirmPayment}>
        {"Konfirmasi Pembayaran"}
      </ButtonComponent>
    </div>
  );
}
