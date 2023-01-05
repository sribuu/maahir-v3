import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PaymentMethodFormOrder from "../payment_method_form/PaymentMethodForm.order";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";

export interface IFillDetailPaymentCardOrderProps {
  title?: string;
}

FillDetailPaymentCardOrder.defaultProps = {
  title: "Pilih Metode Pembayaran",
};

export default function FillDetailPaymentCardOrder(
  props: IFillDetailPaymentCardOrderProps
) {
  const { handlePaymentMethod } = useFillDetailOrderContext();

  const handleSubmit = (data: string) => {
    handlePaymentMethod(parseInt(data));
  };

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h1>
      </div>

      <PaymentMethodFormOrder onSelect={handleSubmit} />
    </CardComponent>
  );
}
