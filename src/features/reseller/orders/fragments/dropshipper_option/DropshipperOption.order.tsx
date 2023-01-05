import * as React from "react";
import clsx from "clsx";
import SwitchToggleComponent, {
  ISwitchToggleComponentProps,
} from "@/src/core/ui/components/switch_toggle/SwitchToggle.component";

export interface IDropshipperOptionOrderProps
  extends ISwitchToggleComponentProps {}

export default function DropshipperOptionOrder(
  props: IDropshipperOptionOrderProps
) {
  return (
    <div className={clsx("flex justify-between items-center", "w-full")}>
      <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
        {"Kirim Sebagai Dropshipper"}
      </h1>
      <SwitchToggleComponent {...props} />
    </div>
  );
}
