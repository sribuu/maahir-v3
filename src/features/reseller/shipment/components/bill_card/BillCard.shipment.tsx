import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";

export interface IBillCardShipmentProps {
  title?: string;
  totalPriceText?: string;
  quantity?: string;
  totalPrice?: string;
  servicePriceText?: string;
  servicePrice?: string;
  shipmentPriceText?: string;
  shipmentPrice?: string;
  totalPaymentText?: string;
  totalPayment?: string;

  disableOrderConfirmation?: boolean;
  orderConfirmation?: boolean;
  continuePayment?: boolean;
  onOrderConfirmation?: () => void;
  onContinuePayment?: () => void;
}

BillCardShipment.defaultProps = {
  title: "Pesanan Kamu",
  totalPriceText: "Total Harga",
  quantity: "6 Barang",
  totalPrice: "Rp2.000.000",
  servicePriceText: "Biaya Penanganan",
  servicePrice: "Rp2.000",
  shipmentPriceText: "Total Biaya Pengiriman",
  shipmentPrice: "Rp10.0000",
  totalPaymentText: "Total Pembayaran",
  totalPayment: "Rp2.012.000",

  disableOrderConfirmation: true,
  orderConfirmation: true,
  continuePayment: false,
};

export default function BillCardShipment(props: IBillCardShipmentProps) {
  const handleClickConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onOrderConfirmation) {
      props.onOrderConfirmation();
    }
  };
  const handleClickPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onContinuePayment) {
      props.onContinuePayment();
    }
  };
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1rem]",
          "w-full",
          "p-[1.5rem]"
        )}
      >
        <h3 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h3>

        <div className={clsx("w-full h-[1px] bg-bright-gray")} />

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div>
            <p
              className={clsx("text-[1rem] text-charleston-green font-regular")}
            >
              {props.totalPriceText}
            </p>
            <p
              className={clsx("text-[0.75rem] text-independence font-regular")}
            >
              {props.quantity}
            </p>
          </div>

          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {props.totalPrice}
          </p>
        </div>

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
            {props.servicePriceText}
          </p>
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {props.servicePrice}
          </p>
        </div>

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
            {props.shipmentPriceText}
          </p>
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {props.shipmentPrice}
          </p>
        </div>

        <div className={clsx("w-full h-[1px] bg-bright-gray")} />

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
            {props.totalPaymentText}
          </p>
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {props.totalPayment}
          </p>
        </div>

        <button
          className={clsx(
            props.orderConfirmation ? "block" : "hidden",
            "bg-ocean-boat-blue",
            "p-[0.875rem]",
            "rounded-[0.75rem]",
            props.disableOrderConfirmation ? "opacity-40" : "opacity-100",
            "text-[1rem] text-white font-bold"
          )}
          disabled={props.disableOrderConfirmation}
          onClick={handleClickConfirmation}
        >
          {"Konfirmasi Pesanan"}
        </button>

        <button
          className={clsx(
            props.continuePayment ? "block" : "hidden",
            "bg-ocean-boat-blue",
            "p-[0.875rem]",
            "rounded-[0.75rem]",
            "text-[1rem] text-white font-bold"
          )}
          onClick={handleClickPayment}
        >
          {"Lanjutkan Pembayaran"}
        </button>
      </div>
    </CardComponent>
  );
}
