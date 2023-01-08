import React, { useContext } from "react";
import ShipmentAddressCardPayment from "@/src/features/reseller/payment/components/shipment_address_card/ShipmentAddressCard.payment";
import { PaymentInformationContext } from "../../contexts/information/PaymentInformation.context";

export interface IInformationShipmentAddressCardPaymentProps {}

export default function InformationShipmentAddressCardPayment(
  props: IInformationShipmentAddressCardPaymentProps
) {
  const { state } = useContext(PaymentInformationContext);
  return (
    <ShipmentAddressCardPayment
      name={state.address.name}
      email={state.address.email}
      mobile={state.address.mobile}
      address={state.address.address}
      detailAddress={state.address.detail_address}
    />
  );
}
