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

  const handleErrorName = (error: { status: boolean; message: string }) => {
    // dispatch({
    //   type
    // })
  };

  const handleErrorEmail = (error: { status: boolean; message: string }) => {
    //
  };

  const handleErrorMobile = (error: { status: boolean; message: string }) => {
    //
  };

  const handleErrorDetailAddress = (error: {
    status: boolean;
    message: string;
  }) => {
    //
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
      onErrorName={handleErrorName}
      onChangeEmail={handleChangeEmail}
      onErrorEmail={handleErrorEmail}
      onChangePhonenumber={handleChangeMobile}
      onErrorPhonenumber={handleErrorMobile}
      onChangeAddress={handleChangeAddress}
      onChangeDetailAddress={handleChangeDetailAddress}
      onErrorDetailAddress={handleErrorDetailAddress}
      onSaveChange={handleSaveChange}
    />
  );
}
