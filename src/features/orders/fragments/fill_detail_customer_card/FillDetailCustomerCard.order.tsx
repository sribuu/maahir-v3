import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PersonalInformationForm from "../personal_information_form/PersonalInformationForm.order";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";

export interface IFillDetailCustomerCardOrderProps {
  title?: string;
}

FillDetailCustomerCardOrder.defaultProps = {
  title: "Alamat Pengantaran",
};

export default function FillDetailCustomerCardOrder(
  props: IFillDetailCustomerCardOrderProps
) {
  const {
    setName,
    setEmail,
    setPhonenumber,
    setAddress,
    setErrorName,
    setErrorEmail,
    setErrorAddress,
    setErrorPhonenumber,
  } = useFillDetailOrderContext();

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h1>
      </div>
      <PersonalInformationForm
        onChangeName={setName}
        onErrorName={setErrorName}
        onChangeEmail={setEmail}
        onErrorEmail={setErrorEmail}
        onChangeAddress={setAddress}
        onErrorAddress={setErrorAddress}
        onChangePhonenumber={setPhonenumber}
        onErrorPhonenumber={setErrorPhonenumber}
      />
    </CardComponent>
  );
}
