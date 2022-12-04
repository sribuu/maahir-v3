import React, { useEffect, useState } from "react";
import TextfieldComponent from "../textfield/Textfield.component";

export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const trailingSlashRegex = /\s+$/;

export const invalidNameValidation = (value: string) =>
  !nameRegex.test(value) && !trailingSlashRegex.test(value);

export const errorNameValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Nama tidak valid" : "";

export interface INameInputComponentProps {
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

export default function NameInputComponent(props: INameInputComponentProps) {
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
