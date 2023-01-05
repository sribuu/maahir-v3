import React, { useContext } from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";

export interface IFloatingActionBuyCartProps {}

export default function FloatingActionBuyCart(
  props: IFloatingActionBuyCartProps
) {
  const { state } = useContext(ResellerMyCartContext);
  const totalSelectedPrice: number = state.cart.items?.reduce((acc, item) => {
    const supplierItemTotal = item?.supplier?.data.reduce(
      (accSupplierItem, supplierItem) => {
        accSupplierItem = supplierItem.selected
          ? supplierItem.price + accSupplierItem
          : accSupplierItem;
        return accSupplierItem;
      },
      0
    );
    return acc + supplierItemTotal;
  }, 0);

  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "fixed bottom-0 left-0 right-0",
        "p-6 border w-full box-border",
        "rounded-tl-[0.75rem] rounded-tr-[0.75rem]",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div>
        <p className={clsx("text-[0.875rem] text-charleston-green font-medium")}>
          {"Total Pembayaran"}
        </p>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {thousandSeparator(totalSelectedPrice)}
        </p>
      </div>
      <button
        className={clsx(
          "flex items-center justify-center",
          "rounded-[0.875rem]",
          "p-[0.75rem]",
          "bg-ocean-boat-blue"
        )}
        disabled={false}
        // onClick={handleSelectPaymentMethod}
      >
        <p className={clsx("text-[1rem] text-white font-medium")}>
          {"Beli Sekarang"}
        </p>
      </button>
    </div>
  );
}
