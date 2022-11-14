import * as React from "react";
import clsx from "clsx";
import TextfieldComponent from "../textfield/Textfield.component";
import DropdownComponent from "../dropdown/Dropdown.component";
import DeliveryAddressListComponent from "../delivery_address_list/DeliveryAddressList.component";

export interface IDeliveryAddressListCardComponentProps {
  title?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  province?: string;
  district?: string;
  postal_code?: string;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
DeliveryAddressListCardComponent.defaultProps = {
  title: "Alamat Pengantaran",
  name: "",
  email: "",
  phone_number: "",
  address: "",
  province: "",
  district: "",
  postal_code: "",
};

export default function DeliveryAddressListCardComponent(
  props: IDeliveryAddressListCardComponentProps
) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-base text-dark-charcoal font-bold")}>
          {props.title}
        </p>

        <button onClick={props.onEdit}>
          <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
            {"UBAH DETAIL"}
          </p>
        </button>
      </div>
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
      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <DeliveryAddressListComponent
          label={"Provinsi"}
          value={props.province}
        />
      </div>

      <div className={clsx("grid grid-cols-2 justify-start", "gap-x-6 w-full")}>
        <DeliveryAddressListComponent
          label={"Kecamatan"}
          value={props.district}
        />
        <DeliveryAddressListComponent
          label={"Kode Pos"}
          value={props.postal_code}
        />
      </div>
    </div>
  );
}
