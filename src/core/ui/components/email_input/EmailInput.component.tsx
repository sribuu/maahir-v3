import React, { useState, useEffect } from "react";
import TextfieldComponent from "../textfield/Textfield.component";

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const invalidEmailValidation = (value: string) =>
  !emailRegex.test(value);

export const errorEmailValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Alamat email tidak valid" : "";

export interface IEmailInputComponentProps {
  value?: string;
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

export default function EmailInputComponent(props: IEmailInputComponentProps) {
  const [email, setEmail] = useState("");
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  useEffect(() => {
    if (props.onChange) {
      props.onChange(email);
    }
  }, [email]);

  const [emailValidation, setEmailValidation] = useState({
    invalid: false,
    message: "",
  });

  useEffect(() => {
    if (email.length > 0) {
      setEmailValidation({
        ...emailValidation,
        invalid: invalidEmailValidation(email),
        message: errorEmailValidationMessage(invalidEmailValidation(email)),
      });
    }
  }, [email]);

  useEffect(() => {
    if (props.onError) {
      props.onError({
        status: emailValidation.invalid,
        message: emailValidation.message,
      });
    }
  }, [emailValidation.invalid, emailValidation.message]);

  useEffect(() => {
    if (props.value?.length > 0) {
      setEmail(props?.value);
    }
  }, [props.value]);
  return (
    <TextfieldComponent
      value={email}
      label={"Email"}
      placeholder={"John@contoh.com"}
      invalid={String(emailValidation.invalid)}
      helpertext={emailValidation.message}
      onChange={handleChangeEmail}
    />
  );
}
