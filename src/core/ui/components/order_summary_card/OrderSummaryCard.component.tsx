import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";

export interface IOrderSummaryCardComponentProps {
  title?: string;
  quantity?: number;
  totalPrice?: string;
  subTotalPrice?: string;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
OrderSummaryCardComponent.defaultProps = {
  title: "Ringkasan Belanja",
  quantity: 0,
  totalPrice: "Rp0",
  subTotalPrice: "Rp0",
};

export default function OrderSummaryCardComponent(
  props: IOrderSummaryCardComponentProps
) {
  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onCancel) {
      props.onCancel(e);
    }
  };

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div
        className={clsx("grid grid-cols-1 justify-start", "gap-y-3  w-full")}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Total Belanja"}
        </p>

        {/* lists */}
        <div className={clsx("flex justify-between", "w-full")}>
          <div>
            <p className={clsx("text-base text-charleston-green font-regular")}>
              {"Sub Total"}
            </p>
            <p
              className={clsx("text-[0.75rem] text-independence font-regular")}
            >
              {`x${props.quantity} items`}
            </p>
          </div>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {props.subTotalPrice}
          </p>
        </div>

        <hr className={clsx("border-b", "border-bright-gray")} />

        <div className={clsx("flex justify-between", "w-full")}>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {"Total Pembayaran"}
          </p>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {props.totalPrice}
          </p>
        </div>

        {/* actions button */}

        <div className={clsx("grid grid-cols-2", "gap-x-6 w-full")}>
          <ButtonComponent
            intent={"secondary"}
            size={"medium"}
            onClick={handleClickCancel}
          >
            {"Batalkan"}
          </ButtonComponent>
          <ButtonComponent
            intent={"primary"}
            size={"medium"}
            onClick={handleClickSubmit}
          >
            {"Pilih Metode Pembayaran"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
