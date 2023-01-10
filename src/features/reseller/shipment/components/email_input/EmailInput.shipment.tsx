import React, { useState, useEffect } from "react";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { invalidEmailValidation } from "@/src/core/utils/validation";

export const errorEmailValidationMessage = (invalidStatus: boolean) =>
  invalidStatus ? "Alamat email tidak valid" : "";

export interface IEmailInputShipmentProps {
  value?: string;
  onChange?: (data: string) => void;
  onError?: (error: { status: boolean; message: string }) => void;
}

export default function EmailInputShipment(props: IEmailInputShipmentProps) {
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
