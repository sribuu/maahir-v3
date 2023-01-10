import React, { useEffect, useState } from "react";
import AutocompleteComponent from "@/src/core/ui/components/autocomplete/Autocomplete.component";
import { invalidAddressValidation } from "@/src/core/utils/validation";

export const errorAddressValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Alamat tidak valid" : "";

export interface IAddressAutocompleteShipmentProps {
  value?: string;

  onSelect?: (data: string) => void;
  onChange?: (data: string) => void;
  onClear?: () => void;
  list?: string[];
  onError?: (error: { status: boolean; message: string }) => void;
}

AddressAutocompleteShipment.defaultProps = {
  value: "",
  list: [],
};

export default function AddressAutocompleteShipment(
  props: IAddressAutocompleteShipmentProps
) {
  const [address, setAddress] = useState("");

  const handleSelectAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddress(e.currentTarget.value);

    if (props.onSelect) {
      props.onSelect(e.currentTarget.id);
    }
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.currentTarget.value);
    }
  };

  const handleClearAddress = () => {
    setAddress("");
    if (props.onClear) {
      props.onClear();
    }
  };

  //   validation
  const [addressValidation, setAddressValidation] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    setAddressValidation({
      ...addressValidation,
      invalid: invalidAddressValidation(address),
      message: errorAddressValidationMessage(invalidAddressValidation(address)),
    });
  }, [address]);

  useEffect(() => {
    if (props.onError) {
      props.onError({
        status: addressValidation.invalid,
        message: addressValidation.message,
      });
    }
  }, [addressValidation.invalid, addressValidation.message]);

  // useEffect(() => {
  //   if (props.value?.length > 0) {
  //     setAddress(props?.value);
  //   }
  // }, [props.value]);
  return (
    <AutocompleteComponent
      label={"Alamat"}
      placeholder={"Input alamat disini"}
      options={props.list}
      disabled={false}
      // selected={address}
      onChange={handleChangeAddress}
      onSelect={handleSelectAddress}
      onClear={handleClearAddress}
    />
  );
}
