import React, { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PaymentMethodFormOrder from "../payment_method_form/PaymentMethodForm.order";
import SelectedPaymentListOrder from "../selected_payment_list/SelectedPaymentList.order";
import { usePaymentMethodData } from "../../hooks/usePaymentMethod";
import { useOrderItemData, useOrderItemQuery } from "../../hooks/useOrderItem";

export interface ISummaryPaymentCardOrderProps {
  title?: string;
}

SummaryPaymentCardOrder.defaultProps = {
  title: "Metode Pembayaran",
};

export default function SummaryPaymentCardOrder(
  props: ISummaryPaymentCardOrderProps
) {
  // const orderItem = useOrderItemData();
  const { data: orderItem, isLoading } = useOrderItemQuery();
  // const { setPaymentMethod } = useFillDetailOrderContext();

  const [edit, setEdit] = useState(false);

  const handleSelect = (data: string) => {
    //
  };

  const handleSave = () => {
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  if (isLoading) {
    return <div />;
  }
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "gap-y-[1.5rem]"
        )}
      >
        <div className={clsx("flex justify-between items-center", "w-full")}>
          <h1
            className={clsx("text-[1.25rem] text-charleston-green font-bold")}
          >
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

        {edit ? (
          <PaymentMethodFormOrder
            selected={String(orderItem?.payment_method?.id)}
            onSelect={handleSelect}
          />
        ) : (
          <SelectedPaymentListOrder {...orderItem.payment_method} />
        )}
      </div>
    </CardComponent>
  );
}
