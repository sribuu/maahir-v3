import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../../../../core/ui/components/button/Button.component";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IShoppingSummaryCardOrderProps {
  title?: string;
  quantity?: number;
  totalPrice?: number;
  subTotalPrice?: number;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
ShoppingSummaryCardOrder.defaultProps = {
  title: "Ringkasan Belanja",
  quantity: 0,
  totalPrice: "Rp0",
  subTotalPrice: "Rp0",
};

export const formatQuantityDisplay = (quantity: number) => {
  if (quantity <= 1) {
    return `x${quantity} item`;
  } else {
    return `x${quantity} items`;
  }
};

export default function ShoppingSummaryCardOrder(
  props: IShoppingSummaryCardOrderProps
) {
  const { title, quantity, totalPrice, subTotalPrice, onCancel, onSubmit } =
    props;

  const totalSubPriceFormatted = thousandSeparator(subTotalPrice);
  const totalPriceFormatted = thousandSeparator(totalPrice);
  const quantityFormatted = formatQuantityDisplay(quantity);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      <p className={clsx("text-base text-dark-charcoal font-bold")}>{title}</p>
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
              {quantityFormatted}
            </p>
          </div>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {totalSubPriceFormatted}
          </p>
        </div>

        <hr className={clsx("border-b", "border-bright-gray")} />

        <div className={clsx("flex justify-between", "w-full")}>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {"Total Pembayaran"}
          </p>
          <p className={clsx("text-base text-charleston-green font-bold")}>
            {totalPriceFormatted}
          </p>
        </div>

        {/* actions button */}

        <div className={clsx("grid grid-cols-1", "gap-y-[1.5rem] w-full")}>
          <ButtonComponent
            intent={"secondary"}
            size={"large"}
            onClick={onCancel}
          >
            {"Batalkan"}
          </ButtonComponent>
          <ButtonComponent
            intent={"primary"}
            size={"large"}
            onClick={onSubmit}
          >
            {"Pilih Metode Pembayaran"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
