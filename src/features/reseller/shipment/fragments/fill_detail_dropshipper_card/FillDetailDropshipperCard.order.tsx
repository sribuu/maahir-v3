import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import DropshipperOptionOrder from "../../../orders/fragments/dropshipper_option/DropshipperOption.order";
import DropshipperFormOrder from "../../components/dropshipper_form/DropshipperForm.shipment";
import { useFillDetailOrderContext } from "../../../orders/contexts/useFillDetailContext";
export interface IFillDetailDropshipperCardOrderProps {}

export default function FillDetailDropshipperCardOrder(
  props: IFillDetailDropshipperCardOrderProps
) {
  const [open, setOpen] = useState(false);
  const { setDropshipperName, setDropshipperPhonenumber } =
    useFillDetailOrderContext();

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <DropshipperOptionOrder onSwitch={setOpen} />
      {open && (
        <DropshipperFormOrder
          onChangeName={setDropshipperName}
          onChangePhonenumber={setDropshipperPhonenumber}
        />
      )}
    </CardComponent>
  );
}
