import React, { useEffect, useState } from "react";
import TextfieldComponent from "../../../../../core/ui/components/textfield/Textfield.component";

export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const trailingSlashRegex = /\s+$/;

export const invalidNameValidation = (value: string) => value.length <= 0;

export const errorNameValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Detail Alamat tidak valid" : "";

export interface IDetailAddressInputShipmentProps {
  value?: string;
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

DetailAddressInputShipment.defaultProps = {
  value: "",
};

export default function DetailAddressInputShipment(
  props: IDetailAddressInputShipmentProps
) {
  const [detailAddress, setDetailAddress] = useState("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.currentTarget.value);
  };
  useEffect(() => {
    if (props.onChange) {
      props.onChange(detailAddress);
    }
  }, [detailAddress]);

  //   validation
  const [detailAddressValidation, setDetailAddressValidation] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (detailAddress.length > 0) {
      setDetailAddressValidation({
        ...detailAddressValidation,
        invalid: invalidNameValidation(detailAddress),
        message: errorNameValidationMessage(
          invalidNameValidation(detailAddress)
        ),
      });
    }
  }, [name]);

  useEffect(() => {
    if (props.onError) {
      props.onError({
        status: detailAddressValidation.invalid,
        message: detailAddressValidation.message,
      });
    }
  }, [detailAddressValidation.invalid, detailAddressValidation.message]);

  useEffect(() => {
    if (props.value?.length > 0) {
      setDetailAddress(props?.value);
    }
  }, [props.value]);
  return (
    <TextfieldComponent
      value={detailAddress}
      label={"Detail Alamat"}
      placeholder={"Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir"}
      invalid={String(detailAddressValidation.invalid)}
      helpertext={detailAddressValidation.message}
      onChange={handleChangeName}
    />
  );
}
