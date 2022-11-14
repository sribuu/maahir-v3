import * as React from "react";
import clsx from "clsx";
import ChoicePaymentMethodListsComponent from "../choice_of_payment_method_lists/ChoiceOfPaymentMethodLists.component";

export interface IChoiceOfPaymentMethodCardComponentProps {
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

ChoiceOfPaymentMethodCardComponent.defaultProps = {
  title: "Pilih Metode Pembayaran",
  paymentItems: [],
};

export default function ChoiceOfPaymentMethodCardComponent(
  props: IChoiceOfPaymentMethodCardComponentProps
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
        <p className={clsx("text-base text-dark-charcoal font-bold")}>
          {props.title}
        </p>

        {props.save && (
          <button onClick={props.onSave}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"SIMPAN"}
            </p>
          </button>
        )}
      </div>
      {props.paymentItems !== undefined &&
        props.paymentItems.length > 0 &&
        props.paymentItems.map((paymentItem, index) => {
          return (
            <ChoicePaymentMethodListsComponent
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
