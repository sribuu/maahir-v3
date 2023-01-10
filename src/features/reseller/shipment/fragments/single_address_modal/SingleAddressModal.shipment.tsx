import React, { useContext } from "react";
import AddressModalShipment from "../../components/address_modal/AddressModal.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface ISingleAddressModalShipmentProps {}

export default function SingleAddressModalShipment(
  props: ISingleAddressModalShipmentProps
) {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const handleChangeName = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetNameValue,
      payload: data,
    });
  };

  const handleChangeEmail = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetEmailValue,
      payload: data,
    });
  };

  const handleChangeMobile = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetMobileValue,
      payload: data,
    });
  };

  const handleChangeAddress = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetAddressValue,
      payload: data,
    });
  };

  const handleSelectAddress = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SelectAddressValue,
      payload: data,
    });
  };

  const handleClearAddress = () => {
    dispatch({
      type: SingleShipmentActionEnum.ClearAddressValue,
    });
  };

  const handleChangeDetailAddress = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetDetailAddressValue,
      payload: data,
    });
  };

  const handleCloseAddAddress = () => {
    dispatch({
      type: SingleShipmentActionEnum.CloseModalPersonalInformation,
    });
  };

  const handleSaveChange = () => {
    dispatch({
      type: SingleShipmentActionEnum.SaveChangeValue,
    });
  };

  return (
    <AddressModalShipment
      open={state.personal_information.modal.open}
      disabledCTASaveChange={
        state.personal_information.disabled_save_change.status
      }
      name={state.personal_information.name.change_value}
      email={state.personal_information.email.change_value}
      phonenumber={state.personal_information.mobile.change_value}
      address={state.personal_information.address.change_value}
      addressList={state.personal_information.address.list}
      onClose={handleCloseAddAddress}
      onChangeName={handleChangeName}
      onChangeEmail={handleChangeEmail}
      onChangePhonenumber={handleChangeMobile}
      onChangeAddress={handleChangeAddress}
      onSelectAddress={handleSelectAddress}
      onClearAddress={handleClearAddress}
      onChangeDetailAddress={handleChangeDetailAddress}
      onSaveChange={handleSaveChange}
    />
  );
}
