import { useState } from "react";
import clsx from "clsx";
import ButtonComponent from "../../../../core/ui/components/button/Button.component";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";
import { useOrderItemData } from "../../hooks/useOrderItem";
import OrderItemListComponent from "../order_item_list/OrderItemList.component";
import TotalPaymentListComponent from "../total_payment_list/TotalPaymentList.component";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import TotalPriceListComponent from "../total_price_list/TotalPriceList.component";
import TotalShippingCostListOrder from "../total_shipping_cost_list/TotalShippingCostList.component";
import TotalServiceCostListOrder from "../total_service_cost_list/TotalServiceCostList.component";

import SummaryYourOrderModalComponent from "../summary_your_order_modal/SummaryYourOrderModal.component";

export interface ISummaryProductCardOrderProps {
  title?: string;
  onSubmit?: () => void;
}
SummaryProductCardOrder.defaultProps = {
  title: "Pesanan Kamu",
};

export default function SummaryProductCardOrder(
  props: ISummaryProductCardOrderProps
) {
  const orderItem = useOrderItemData();
  const itemList = orderItem?.orders?.map((item) => {
    return {
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    };
  });

  const { validate } = useFillDetailOrderContext();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
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
        <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h1>
        {edit ? (
          <button onClick={handleSave}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"SIMPAN"}
            </p>
          </button>
        ) : (
          <button onClick={handleEdit}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"UBAH DETAIL"}
            </p>
          </button>
        )}
      </div>

      <section
        id={"detail_item_section"}
        className={clsx("grid grid-cols-1 gap-y-[1.25rem]", "w-full")}
      >
        {itemList?.map((item, index) => (
          <OrderItemListComponent key={index} {...item} />
        ))}
      </section>

      <DividerComponent />

      <section id={"total_price_section"}>
        <TotalPriceListComponent itemList={itemList} />
      </section>

      <section id={"total_service_cost_section"}>
        <TotalServiceCostListOrder serviceCost={0} />
      </section>

      <section id={"total_shipping_cost_section"}>
        <TotalShippingCostListOrder shippingCost={0} />
      </section>

      <DividerComponent />

      <section id={"total_payment_section"}>
        <TotalPaymentListComponent itemList={itemList} />
      </section>

      <ButtonComponent
        disabled={false}
        intent={"primary"}
        size={"large"}
        onClick={handleSubmit}
      >
        {"Lanjutkan Pembayaran"}
      </ButtonComponent>

      <SummaryYourOrderModalComponent open={true} />
    </div>
  );
}
