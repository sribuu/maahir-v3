import * as React from "react";
import clsx from "clsx";
import NameInputComponent from "@/src/core/ui/components/name_input/NameInput.component";
import EmailInputComponent from "@/src/core/ui/components/email_input/EmailInput.component";
import AddressAutocompleteOrder from "../address_autocomplete/AddressAutocomplete.order";
import PhoneNumberInputComponent from "@/src/core/ui/components/phonenumber_input/PhonenumberInput.component";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";

export interface IPersonalInformationFormProps {
  title?: string;
  onChangeName?: (data: string) => void;
  onErrorName?: (error: { status: boolean; message: string }) => void;
  onChangeEmail?: (data: string) => void;
  onErrorEmail?: (error: { status: boolean; message: string }) => void;
  onChangePhonenumber?: (data: string) => void;
  onErrorPhonenumber?: (error: { status: boolean; message: string }) => void;
  onChangeAddress?: (data: string) => void;
  onErrorAddress?: (error: { status: boolean; message: string }) => void;
}
PersonalInformationForm.defaultProps = {
  title: "Alamat Pengantaran",
};

export default function PersonalInformationForm(
  props: IPersonalInformationFormProps
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
        <NameInputComponent
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
        <EmailInputComponent
          onChange={props.onChangeEmail}
          onError={props.onErrorEmail}
        />
        <PhoneNumberInputComponent
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
          onSelect={props.onChangeAddress}
          onError={props.onErrorAddress}
        />
      </div>
    </form>
  );
}
