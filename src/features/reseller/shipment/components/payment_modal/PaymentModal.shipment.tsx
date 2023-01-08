import * as React from "react";
import clsx from "clsx";
import ModalComponent, {
  IModalComponentProps,
} from "@/src/core/ui/components/modal/Modal.component";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import CloseIcon from "@/src/core/ui/icons/close/Close.icon";
import PaymentMethodOptionOrder from "../../../orders/fragments/payment_method_option/PaymentMethodOption.order";

export interface IPaymentModalShipmentProps extends IModalComponentProps {
  title?: string;
  ctaPurchaseText?: string;
  totalBillText?: string;
  totalBill?: string;
  disabledCTASaveChange?: boolean;
  list: {
    id: string;
    logo: string;
    name: string;
    selected: boolean;
  }[];
  onPurchase?: () => void;
  onSelectOptions?: (data: string) => void;
}
PaymentModalShipment.defaultProps = {
  title: "Pilih Metode Pembayaran",
  open: false,
  ctaPurchaseText: "Bayar",
  totalBillText: "Total Tagihan",
  totalBill: "Rp2.297.996",
  disabledCTASaveChange: true,
  list: [],
};

export default function PaymentModalShipment(
  props: IPaymentModalShipmentProps
) {
  const handleCloseAddAddressModal = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (props.onClose) {
      props.onClose();
    }
  };
  const handlePurchaseItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onPurchase) {
      props.onPurchase();
    }
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSelectOptions) {
      props.onSelectOptions(e.currentTarget.id);
    }
  };
  return (
    <ModalComponent open={props.open} onClose={props.onClose}>
      <CardComponent>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem] items-start content-start",
            "w-full",
            "p-[1.5rem]",
            "min-w-[504px]",
            "relative"
          )}
        >
          <div
            className={clsx("flex items-center justify-start gap-x-[0.75rem]")}
          >
            <button onClick={handleCloseAddAddressModal}>
              <CloseIcon
                className={clsx("w-[1.5rem] h-[1.5rem] fill-taupe-gray")}
              />
            </button>

            <h2
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.title}
            </h2>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 gap-y-[1.5rem] items-start content-start",
              "w-full",
              "max-h-[600px]",
              "overflow-auto"
            )}
          >
            {props.list.length > 0 &&
              props.list.map((option, index) => (
                <PaymentMethodOptionOrder
                  key={index}
                  id={option.id}
                  selected={option.selected}
                  logo={option.logo}
                  name={option.name}
                  onSelect={handleSelect}
                />
              ))}
          </div>

          <div
            className={clsx(
              "flex items-center justify-between",
              "w-full",
              "px-[1.5rem] py-[1.125rem]",
              "border-t border-t-gainsboro",
              "absolute bottom-0 left-0 right-0",
              "z-10",
              "bg-white",
              "rounded-br-[1rem] rounded-bl-[1rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 gap-y-[0.125rem] items-center content-center justify-start justify-items-start"
              )}
            >
              <p
                className={clsx(
                  "text-[0.875rem] text-independence font-regular"
                )}
              >
                {props.totalBillText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-charleston-green font-bold"
                )}
              >
                {props.totalBill}
              </p>
            </div>

            <button
              className={clsx(
                props.disabledCTASaveChange ? "opacity-40" : "opacity-100",
                "flex items-center justify-center",
                "p-[0.875rem]",
                "rounded-[0.75rem]",
                "bg-ocean-boat-blue",
                "text-white text-[1rem] font-bold",
                "w-[160px]"
              )}
              disabled={props.disabledCTASaveChange}
              onClick={handlePurchaseItems}
            >
              {props.ctaPurchaseText}
            </button>
          </div>
        </div>
      </CardComponent>
    </ModalComponent>
  );
}
