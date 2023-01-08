import React, { useContext } from "react";
import UnfilledAddressCardShipment from "../../components/unfilled_address_card/UnfilledAddressCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface ISingleUnfilledAddressCardShipmentProps {}

export default function SingleUnfilledAddressCardShipment(
  props: ISingleUnfilledAddressCardShipmentProps
) {
  const { dispatch } = useContext(SingleShipmentContext);
  const handleClickCTAAddAddress = () => {
    dispatch({
      type: SingleShipmentActionEnum.OpenModalPersonalInformation,
    });
  };
  return (
    <UnfilledAddressCardShipment
      onClickCTAAddAddress={handleClickCTAAddAddress}
    />
  );
}
