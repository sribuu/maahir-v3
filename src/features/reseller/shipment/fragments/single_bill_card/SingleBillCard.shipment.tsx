import React, { useContext } from "react";
import BillCardShipment from "@/src/features/reseller/shipment/components/bill_card/BillCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface ISingleBillCardShipmentProps {}

export default function SingleBillCardShipment(
  props: ISingleBillCardShipmentProps
) {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const handleConfirm = () => {
    dispatch({
      type: SingleShipmentActionEnum.ClickOrderConfirmation,
    });
  };
  return (
    <BillCardShipment
      title={"Pesanan Kamu"}
      totalPriceText={"Total Harga"}
      quantity={state.orders.summary.total_quantity}
      totalPrice={state.orders.summary.total_price}
      servicePriceText={"Biaya Penanganan"}
      servicePrice={state.orders.summary.service_cost}
      shipmentPriceText={"Total Biaya Pengiriman"}
      shipmentPrice={state.orders.summary.shipment_cost}
      totalPaymentText={"Total Pembayaran"}
      totalPayment={state.orders.summary.total_payment}
      ctaConfirmationText={state.orders.cta}
      actionEnabled={true}
      onConfirm={handleConfirm}
    />
  );
}
