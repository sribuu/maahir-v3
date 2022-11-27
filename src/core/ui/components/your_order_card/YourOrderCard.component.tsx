import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "../button/Button.component";
import Divider from "../divider";
import OrderItemListComponent from "@/src/features/orders/fragments/order_item_list/OrderItemList.component";
import TotalPriceListComponent from "@/src/features/orders/fragments/total_price_list/TotalPriceList.component";
import TotalPaymentListComponent from "@/src/features/orders/fragments/total_payment_list/TotalPaymentList.component";
export interface IYourOrderCardComponentProps {
  title?: string;
  price?: string;
  itemList?: { name: string; quantity: number; price: number }[];

  disabled?: boolean;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
YourOrderCardComponent.defaultProps = {
  title: "Pesanan Kamu",
  price: "Rp 49.999",
  itemList: [],
  quantity: 0,
  disabled: true,
};

export default function YourOrderCardComponent(
  props: IYourOrderCardComponentProps
) {
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

      {/* item list section */}
      <section
        id={"detail_item_section"}
        className={clsx("grid grid-cols-1 gap-y-[1.25rem]", "w-full")}
      >
        {props.itemList.map((item, index) => (
          <OrderItemListComponent key={index} {...item} />
        ))}
      </section>

      <Divider />

      <section id={"total_price_section"}>
        <TotalPriceListComponent itemList={props.itemList} />
      </section>

      <section id={"total_payment_section"}>
        <TotalPaymentListComponent />
      </section>

      <ButtonComponent
        disabled={props.disabled}
        intent={"primary"}
        size={"large"}
        onClick={handleSubmit}
      >
        {"Lanjutkan Pembayaran"}
      </ButtonComponent>
    </div>
  );
}
