import * as React from "react";
import clsx from "clsx";
import TextfieldComponent from "../textfield/Textfield.component";
import DropdownComponent from "../dropdown/Dropdown.component";

export interface IDeliveryAddressFormCardComponentProps {
  title?: string;
  name?: string;
  email?: string;
  phone_number?: string;

  address?: string;
  province?: string;
  district?: string;
  postal_code?: string;
  save?: boolean;
  districtList?: string[];
  provinceList?: string[];
  onChangeName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhoneNumber?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProvince?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeDistrict?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangePostalCode?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
DeliveryAddressFormCardComponent.defaultProps = {
  title: "Alamat Pengantaran",
  name: "",
  email: "",
  phone_number: "",
  address: "",
  province: "",
  district: "",
  postal_code: "",
  districtList: [],
  provinceList: [],
};

export default function DeliveryAddressFormCardComponent(
  props: IDeliveryAddressFormCardComponentProps
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

        {props.save && (
          <button onClick={props.onSave}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"SIMPAN"}
            </p>
          </button>
        )}
      </div>

      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <TextfieldComponent
          value={props.name}
          label={"Nama"}
          placeholder={"John"}
          onChange={props.onChangeName}
        />
      </div>
      <div className={clsx("grid grid-cols-2 justify-start", "gap-x-6 w-full")}>
        <TextfieldComponent
          value={props.email}
          label={"Email"}
          placeholder={"John@contoh.com"}
          onChange={props.onChangeEmail}
        />
        <TextfieldComponent
          value={props.phone_number}
          label={"Nomor HP"}
          placeholder={"+6282100221100"}
          onChange={props.onChangePhoneNumber}
        />
      </div>
      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <TextfieldComponent
          value={props.address}
          label={"Alamat"}
          placeholder={"jl. rawah bebek"}
          onChange={props.onChangeAddress}
        />
      </div>
      <div className={clsx("grid grid-cols-1 justify-start", "w-full")}>
        <DropdownComponent
          label={"Provinsi"}
          placeholder={"Provinsi"}
          value={props.province}
          lists={props.provinceList}
          onSelect={props.onChangeProvince}
        />
      </div>

      <div className={clsx("grid grid-cols-2 justify-start", "gap-x-6 w-full")}>
        <DropdownComponent
          label={"Kecamatan"}
          placeholder={"Jakarta Pusat"}
          value={props.district}
          lists={props.districtList}
          onSelect={props.onChangeDistrict}
        />
        <TextfieldComponent
          value={props.postal_code}
          label={"Kode Pos"}
          placeholder={"12345"}
          onChange={props.onChangePostalCode}
        />
      </div>
    </div>
  );
}
