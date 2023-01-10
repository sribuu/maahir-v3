import * as React from "react";
import clsx from "clsx";
import NameInputShipment from "@/src/features/reseller/shipment/components/name_input/NameInput.shipment";
import EmailInputShipment from "@/src/features/reseller/shipment/components/email_input/EmailInput.shipment";
import AddressAutocompleteOrder from "../address_autocomplete/AddressAutocomplete.shipment";
import PhoneNumberInputShipment from "@/src/features/reseller/shipment/components/phonenumber_input";
import DetailAddressInputShipment from "../detail_address_input/DetailAddressInput.shipment";

export interface IPersonalInformationFormShipmentProps {
  name?: string;
  email?: string;
  phonenumber?: string;
  address?: string;
  addressList?: string[];
  onChangeName?: (data: string) => void;
  onErrorName?: (error: { status: boolean; message: string }) => void;
  onChangeEmail?: (data: string) => void;
  onErrorEmail?: (error: { status: boolean; message: string }) => void;
  onChangePhonenumber?: (data: string) => void;
  onErrorPhonenumber?: (error: { status: boolean; message: string }) => void;
  onChangeAddress?: (data: string) => void;
  onSelectAddress?: (data: string) => void;
  onErrorAddress?: (error: { status: boolean; message: string }) => void;
  onClearAddress?: () => void;
  onChangeDetailAddress?: (data: string) => void;
  onErrorDetailAddress?: (error: { status: boolean; message: string }) => void;
}
PersonalInformationFormShipment.defaultProps = {
  name: "",
  email: "",
  phonenumber: "",
  address: "",
  addressList: [],
};

export default function PersonalInformationFormShipment(
  props: IPersonalInformationFormShipmentProps
) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className={clsx("grid grid-cols-1 justify-start", "gap-y-6 py-6 w-full")}
      onSubmit={handleSubmit}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <NameInputShipment
          value={props.name}
          onChange={props.onChangeName}
          onError={props.onErrorName}
        />
      </div>
      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start",
          "gap-x-6 w-full"
        )}
      >
        <EmailInputShipment
          value={props.email}
          onChange={props.onChangeEmail}
          onError={props.onErrorEmail}
        />
        <PhoneNumberInputShipment
          value={props.phonenumber}
          onChange={props.onChangePhonenumber}
          onError={props.onErrorPhonenumber}
        />
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <AddressAutocompleteOrder
          list={props.addressList}
          value={props.address}
          onChange={props.onChangeAddress}
          onSelect={props.onSelectAddress}
          onError={props.onErrorAddress}
          onClear={props.onClearAddress}
        />
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <DetailAddressInputShipment
          value={props.address}
          onChange={props.onChangeDetailAddress}
          onError={props.onErrorAddress}
        />
      </div>
    </form>
  );
}
