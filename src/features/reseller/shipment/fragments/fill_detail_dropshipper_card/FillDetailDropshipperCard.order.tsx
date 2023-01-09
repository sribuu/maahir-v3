import { useState, useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import DropshipperOptionOrder from "../../../orders/fragments/dropshipper_option/DropshipperOption.order";
import DropshipperFormOrder from "../../components/dropshipper_form/DropshipperForm.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";
export interface IFillDetailDropshipperCardOrderProps {}

export default function FillDetailDropshipperCardOrder(
  props: IFillDetailDropshipperCardOrderProps
) {
  const [open, setOpen] = useState(false);
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
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <DropshipperOptionOrder onSwitch={setOpen} />
      {open && (
        <DropshipperFormOrder
          name={state.dropshipper.name.value}
          phonenumber={state.dropshipper.mobile.value}
          onChangeName={handleChangeName}
          onChangePhonenumber={handleChangeMobile}
        />
      )}
    </CardComponent>
  );
}
