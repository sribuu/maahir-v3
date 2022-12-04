import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import DropshipperOptionOrder from "../dropshipper_option/DropshipperOption.order";
import DropshipperFormOrder from "../dropshipper_form/DropshipperForm.order";
export interface IFillDetailDropshipperCardOrderProps {}

export default function FillDetailDropshipperCardOrder(
  props: IFillDetailDropshipperCardOrderProps
) {
  const [open, setOpen] = useState(false);

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <DropshipperOptionOrder onSwitch={setOpen} />
      {open && <DropshipperFormOrder />}
    </CardComponent>
  );
}
