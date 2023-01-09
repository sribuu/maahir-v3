import * as React from "react";
import clsx from "clsx";
import PaymentMethodOptionComponent from "../../../shipment/components/payment_method_option/PaymentMethodOption.shipment";

export interface IEditPaymentSummaryCardOrderProps {
  title?: string;
  selected?: string;
  paymentItems?: {
    id: string;
    logo: string;
    name: string;
  }[];
  save?: boolean;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

EditPaymentSummaryCardOrder.defaultProps = {
  title: "Pilih Metode Pembayaran",
  paymentItems: [],
};

export default function EditPaymentSummaryCardOrder(
  props: IEditPaymentSummaryCardOrderProps
) {
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
      </div>
      {props.paymentItems !== undefined &&
        props.paymentItems.length > 0 &&
        props.paymentItems.map((paymentItem, index) => {
          return (
            <PaymentMethodOptionComponent
              key={index}
              selected={props.selected === paymentItem.id ? true : false}
              id={paymentItem.id}
              logo={paymentItem.logo}
              name={paymentItem.name}
              onSelect={props.onSelect}
            />
          );
        })}
    </div>
  );
}
