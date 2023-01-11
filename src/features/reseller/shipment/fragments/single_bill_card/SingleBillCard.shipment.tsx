import React, { useContext } from "react";
import BillCardShipment from "@/src/features/reseller/shipment/components/bill_card/BillCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";
import { useSinglePostCreateOrder } from "../../hooks/usePostCreateOrder.shipment";

export interface ISingleBillCardShipmentProps {}

export default function SingleBillCardShipment(
  props: ISingleBillCardShipmentProps
) {
  const { mutate: createOrder } = useSinglePostCreateOrder();
  const { state, dispatch } = useContext(SingleShipmentContext);
  const handleOrderConfirm = () => {
    dispatch({
      type: SingleShipmentActionEnum.ClickOrderConfirmation,
    });
  };

  const handleContinuePayment = () => {
    createOrder();
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
      orderConfirmation={state.orders.summary.order_confirmation.show}
      continuePayment={state.orders.summary.continue_payment.show}
      disableOrderConfirmation={
        state.orders.summary.order_confirmation.disabled
      }
      onOrderConfirmation={handleOrderConfirm}
      onContinuePayment={handleContinuePayment}
    />
  );
}
