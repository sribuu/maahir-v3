import React, { useEffect, useState } from "react";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { invalidNameValidation } from "@/src/core/utils/validation";

export const errorNameValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Nama tidak valid" : "";

export interface INameInputShipmentProps {
  value?: string;
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

NameInputShipment.defaultProps = {
  value: "",
};

export default function NameInputShipment(props: INameInputShipmentProps) {
  const [name, setName] = useState("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  useEffect(() => {
    if (props.onChange) {
      props.onChange(name);
    }
  }, [name]);

  //   validation
  const [nameValidation, setNameValidation] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (name.length > 0) {
      setNameValidation({
        ...nameValidation,
        invalid: invalidNameValidation(name),
        message: errorNameValidationMessage(invalidNameValidation(name)),
      });
    }
  }, [name]);

  useEffect(() => {
    if (props.onError) {
      props.onError({
        status: nameValidation.invalid,
        message: nameValidation.message,
      });
    }
  }, [nameValidation.invalid, nameValidation.message]);

  useEffect(() => {
    if (props.value?.length > 0) {
      setName(props?.value);
    }
  }, [props.value]);
  return (
    <TextfieldComponent
      value={name}
      label={"Nama"}
      placeholder={"John"}
      invalid={String(nameValidation.invalid)}
      helpertext={nameValidation.message}
      onChange={handleChangeName}
    />
  );
}
