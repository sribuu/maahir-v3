import React, { useContext } from "react";
import FilledAddressCardShipment from "../../components/filled_address_card/FilledAddressCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface ISingleFilledAddressCardShipmentProps {}

export default function SingleFilledAddressCardShipment(
  props: ISingleFilledAddressCardShipmentProps
) {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const handleChangeAddress = () => {
    dispatch({
      type: SingleShipmentActionEnum.OpenModalPersonalInformation,
    });
  };
  return (
    <FilledAddressCardShipment
      name={state.personal_information.name.save_value}
      email={state.personal_information.email.save_value}
      mobile={state.personal_information.mobile.save_value}
      address={state.personal_information.address.save_value}
      detailAddress={state.personal_information.detail_address.save_value}
      onChangeAddress={handleChangeAddress}
    />
  );
}
