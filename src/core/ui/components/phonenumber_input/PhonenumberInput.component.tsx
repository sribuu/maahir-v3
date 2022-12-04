import React, { useState, useEffect } from "react";
import TextfieldComponent from "../textfield/Textfield.component";

export const indonesianPhonenumberRegex =
  /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

export const replaceStringInPhonenumber = (data: string) => {
  const result = data.replace(/[^\d]/g, "");
  return result;
};

export const invalidPhonenumberValidation = (value: string) =>
  !indonesianPhonenumberRegex.test(value);

export const errorPhonenumberValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Nomor HP tidak valid" : "";

export interface IPhoneNumberInputComponentProps {
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

export default function PhoneNumberInputComponent(
  props: IPhoneNumberInputComponentProps
) {
  // value
  const [phonenumber, setPhonenumber] = useState("");
  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reformattedPhonenumber = replaceStringInPhonenumber(
      e.currentTarget.value
    );
    setPhonenumber(reformattedPhonenumber);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(phonenumber);
    }
  }, [phonenumber]);

  //   validation
  const [phonenumberValidation, setPhonenumberValidation] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (phonenumber.length > 0) {
      setPhonenumberValidation({
        ...phonenumberValidation,
        invalid: invalidPhonenumberValidation(phonenumber),
        message: errorPhonenumberValidationMessage(
          invalidPhonenumberValidation(phonenumber)
        ),
      });
    }
  }, [phonenumber]);

  useEffect(() => {
    if (props.onError) {
      props.onError({
        status: phonenumberValidation.invalid,
        message: phonenumberValidation.message,
      });
    }
  }, [phonenumberValidation.invalid, phonenumberValidation.message]);

  return (
    <TextfieldComponent
      value={phonenumber}
      label={"Nomor HP"}
      placeholder={"6282100221100"}
      invalid={String(phonenumberValidation.invalid)}
      helpertext={phonenumberValidation.message}
      onChange={handleChangePhonenumber}
    />
  );
}
