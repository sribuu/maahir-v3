import React, { useEffect, useState } from "react";
import AutocompleteComponent from "@/src/core/ui/components/autocomplete/Autocomplete.component";
import { useProvinceListData } from "../../hooks/useProvinceList";

export const invalidAddressValidation = (value: string) => !value.length;

export const errorAddressValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Alamat tidak valid" : "";

export interface IAddressAutocompleteOrderProps {
  value?: string;
  list?: string[];
  onSelect?: (data: string) => void;
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

AddressAutocompleteOrder.defaultProps = {
  value: "",
  list: [],
};

export default function AddressAutocompleteOrder(
  props: IAddressAutocompleteOrderProps
) {
  const [address, setAddress] = useState("");
  const handleSelectAddress = (data: string) => {
    setAddress(data);
    if (props.onSelect) {
      props.onSelect(data);
    }
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.currentTarget.value);
    }
  };
  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(address);
    }
  }, [address]);

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

  useEffect(() => {
    if (props.value?.length > 0) {
      setAddress(props?.value);
    }
  }, [props.value]);
  return (
    <AutocompleteComponent
      label={"Alamat"}
      placeholder={"Input alamat disini"}
      options={props.list}
      disabled={false}
      selected={address}
      onChange={handleChangeAddress}
      onSelect={handleSelectAddress}
    />
  );
}
