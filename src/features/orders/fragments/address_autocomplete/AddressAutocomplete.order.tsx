import { useEffect, useState } from "react";
import AutocompleteComponent from "@/src/core/ui/components/autocomplete/Autocomplete.component";
import { useProvinceListData } from "../../hooks/useProvinceList";

export const invalidAddressValidation = (value: string) => !value.length;

export const errorAddressValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Alamat tidak valid" : "";

export interface IAddressAutocompleteOrderProps {
  value?: string;
  onSelect?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

AddressAutocompleteOrder.defaultProps = {
  value: "",
};

export default function AddressAutocompleteOrder(
  props: IAddressAutocompleteOrderProps
) {
  const addressList = useProvinceListData();

  const [address, setAddress] = useState("");
  const handleChangeAddress = (data: string) => {
    setAddress(data);
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
      options={addressList}
      disabled={false}
      selected={address}
      onSelect={handleChangeAddress}
    />
  );
}
