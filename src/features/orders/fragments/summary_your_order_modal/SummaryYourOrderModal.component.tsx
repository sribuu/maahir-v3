import * as React from "react";
import clsx from "clsx";
import ModalComponent from "../../../../core/ui/components/modal/Modal.component";
import ButtonComponent from "../../../../core/ui/components/button/Button.component";
import BuyNowItemOrder from "../buy_now_item_card/BuyNowItemCard.order";
import { useOrderItemQuery } from "../../hooks/useOrderItem";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface ISummaryYourOrderModalComponentProps {
  open?: boolean;
  productSrc?: string;
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  quantity?: number;
  onSubstract?: (data: number) => void;
  onAdd?: (data: number) => void;
  onClose?: () => void;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
SummaryYourOrderModalComponent.defaultProps = {
  open: false,
  productSrc: "",
  name: "Paket Reseller Parfum",
  minPrice: "Rp 8.000",
  maxPrice: "10.000",
  price: "Rp 49.999",
  quantity: 0,
};

export default function SummaryYourOrderModalComponent(
  props: ISummaryYourOrderModalComponentProps
) {
  const { data: orderItem, isLoading } = useOrderItemQuery();
  const onSubstract = () => {};
  const onAdd = () => {};
  const onChangeNotes = () => {};
  return (
    <ModalComponent open={props.open} onClose={props.onClose}>
      <div
        className={clsx(
          "grid grid-cols-1",
          "w-full rounded-2xl p-6 gap-y-6 max-h-[684px] overflow-scroll",
          "bg-white"
        )}
      >
        <div className={clsx("flex justify-between", "w-full")}>
          <p className={clsx("text-base text-dark-charcoal font-bold")}>
            {"Pesanan Kamu"}
          </p>
          <button onClick={props.onClose}>
            <img
              src={"/icons/navigation-close.svg"}
              className={clsx("w-6 h-6")}
            />
          </button>
        </div>
        {orderItem?.orders?.map((item) => (
          <BuyNowItemOrder
            name={item?.name}
            productSrc={item?.image}
            price={thousandSeparator(item?.price)}
            quantity={item?.quantity}
            notes={item?.notes}
            onSubstract={onSubstract}
            onAdd={onAdd}
            onChangeNotes={onChangeNotes}
          />
        ))}

        <div className={clsx("flex justify-end", "w-full")}>
          <ButtonComponent intent={"primary"} onClick={props.onSave}>
            {"Simpan Perubahan"}
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
}
