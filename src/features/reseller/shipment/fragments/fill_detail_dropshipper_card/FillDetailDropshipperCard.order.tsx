import { useState, useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import DropshipperOptionShipment from "../../components/dropshipper_option/DropshipperOption.shipment";
import DropshipperFormShipment from "../../components/dropshipper_form/DropshipperForm.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";
export interface IFillDetailDropshipperCardOrderProps {}

export default function FillDetailDropshipperCardOrder(
  props: IFillDetailDropshipperCardOrderProps
) {
  const { state, dispatch } = useContext(SingleShipmentContext);

  const handleChangeName = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetDropshipperNameValue,
      payload: data,
    });
  };

  const handleChangeMobile = (data: string) => {
    dispatch({
      type: SingleShipmentActionEnum.SetDropshipperMobileValue,
      payload: data,
    });
  };

  const handleSwitchDropshipperOption = (_: boolean) => {
    dispatch({
      type: SingleShipmentActionEnum.SwitchDropshipperOption,
    });
  };
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <DropshipperOptionShipment onSwitch={handleSwitchDropshipperOption} />
      {state.dropshipper.is_dropshipper && (
        <DropshipperFormShipment
          name={state.dropshipper.name.value}
          phonenumber={state.dropshipper.mobile.value}
          onChangeName={handleChangeName}
          onChangePhonenumber={handleChangeMobile}
        />
      )}
    </CardComponent>
  );
}
