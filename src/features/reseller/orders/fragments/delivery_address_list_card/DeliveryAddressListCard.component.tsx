import * as React from "react";
import clsx from "clsx";
import TextfieldComponent from "../../../../../core/ui/components/textfield/Textfield.component";
import DropdownComponent from "../../../../../core/ui/components/dropdown/Dropdown.component";
import DeliveryAddressListComponent from "../../../../../core/ui/components/delivery_address_list/DeliveryAddressList.component";

export interface IDeliveryAddressListCardComponentProps {
  title?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;

  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
DeliveryAddressListCardComponent.defaultProps = {
  title: "Alamat Pengantaran",
  name: "",
  email: "",
  phone_number: "",
  address: "",
};

export default function DeliveryAddressListCardComponent(
  props: IDeliveryAddressListCardComponentProps
) {
  return (
    <div className={clsx("grid grid-cols-1 justify-start", "gap-y-6   w-full")}>
      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <DeliveryAddressListComponent label={"Nama"} value={props.name} />
      </div>
      <div className={clsx("grid grid-cols-2 justify-start", "gap-x-6 w-full")}>
        <DeliveryAddressListComponent label={"Email"} value={props.email} />

        <DeliveryAddressListComponent
          label={"Nomor HP"}
          value={props.phone_number}
        />
      </div>
      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <DeliveryAddressListComponent label={"Alamat"} value={props.address} />
      </div>
    </div>
  );
}
