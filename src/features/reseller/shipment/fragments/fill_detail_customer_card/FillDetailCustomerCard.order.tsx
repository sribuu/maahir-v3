import React, { useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PersonalInformationForm from "../../components/personal_information_form/PersonalInformationForm.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";

export interface IFillDetailCustomerCardOrderProps {
  title?: string;
}

FillDetailCustomerCardOrder.defaultProps = {
  title: "Alamat Pengantaran",
};

export default function FillDetailCustomerCardOrder(
  props: IFillDetailCustomerCardOrderProps
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

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h1>
      </div>
      <PersonalInformationForm
        onChangeName={handleChangeName}
        // onErrorName={setErrorName}
        onChangeEmail={handleChangeEmail}
        // onErrorEmail={setErrorEmail}
        onChangeAddress={handleChangeAddress}
        // onErrorAddress={setErrorAddress}
        onChangePhonenumber={handleChangeMobile}
        // onErrorPhonenumber={setErrorPhonenumber}
      />
    </CardComponent>
  );
}
