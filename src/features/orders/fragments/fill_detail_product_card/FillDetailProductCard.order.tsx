import { useEffect } from "react";
import clsx from "clsx";
import ButtonComponent from "../../../../core/ui/components/button/Button.component";
import Divider from "../../../../core/ui/components/divider";
import OrderItemListComponent from "@/src/features/orders/fragments/order_item_list/OrderItemList.component";
import TotalPriceListComponent from "@/src/features/orders/fragments/total_price_list/TotalPriceList.component";
import TotalPaymentListComponent from "@/src/features/orders/fragments/total_payment_list/TotalPaymentList.component";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";
import { useMutateOrderItem, useOrderItemData } from "../../hooks/useOrderItem";
export interface IFillDetailProductCardOrderProps {
  title?: string;
  onSubmit?: () => void;
}
FillDetailProductCardOrder.defaultProps = {
  title: "Pesanan Kamu",
};

export default function FillDetailProductCardOrder(
  props: IFillDetailProductCardOrderProps
) {
  const orderItem = useOrderItemData();
  const itemList = orderItem?.orders?.map((item) => {
    return {
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    };
  });
  // context
  const { validate } = useFillDetailOrderContext();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit();
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
        {itemList?.map((item, index) => (
          <OrderItemListComponent key={index} {...item} />
        ))}
      </section>

      <Divider />

      <section id={"total_price_section"}>
        <TotalPriceListComponent itemList={itemList} />
      </section>

      <section id={"total_payment_section"}>
        <TotalPaymentListComponent itemList={itemList} />
      </section>

      <ButtonComponent
        // disabled={false}
        disabled={!validate}
        intent={"primary"}
        size={"large"}
        onClick={handleSubmit}
      >
        {"Lanjutkan Pembayaran"}
      </ButtonComponent>
    </div>
  );
}
