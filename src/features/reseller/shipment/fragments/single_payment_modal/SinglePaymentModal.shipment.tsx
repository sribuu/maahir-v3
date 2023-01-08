import React, { useContext } from "react";
import PaymentModalShipment from "../../components/payment_modal/PaymentModal.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface ISinglePaymentModalShipmentProps {}

export default function SinglePaymentModalShipment(
  props: ISinglePaymentModalShipmentProps
) {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const handlePurchase = () => {
    dispatch({
      type: SingleShipmentActionEnum.ClickPayItems,
    });
  };
  const handleClosePaymentModal = () => {
    dispatch({
      type: SingleShipmentActionEnum.CloseModalPayment,
    });
  };

  const handleSelectPaymentModal = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SelectPaymentMethod,
      payload: data,
    });
  };
  return (
    <PaymentModalShipment
      open={state.orders.payment.modal.open}
      list={state.orders.payment.list}
      totalBill={state.orders.summary.total_payment}
      disabledCTASaveChange={state.orders.payment.cta.payment.disabled}
      onPurchase={handlePurchase}
      onClose={handleClosePaymentModal}
      onSelectOptions={handleSelectPaymentModal}
    />
  );
}
