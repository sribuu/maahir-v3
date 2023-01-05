import * as React from "react";
import clsx from "clsx";
import NameInputComponent from "@/src/core/ui/components/name_input/NameInput.component";
import PhoneNumberInputComponent from "@/src/core/ui/components/phonenumber_input/PhonenumberInput.component";

export interface IDropshipperFormOrderProps {
  onChangeName?: (data: string) => void;
  onErrrorName?: (error: { status: boolean; message: string }) => void;
  onChangePhonenumber?: (data: {}) => void;
  onErrorPhonenumber?: (error: { status: boolean; message: string }) => void;
}

export default function DropshipperFormOrder(
  props: IDropshipperFormOrderProps
) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className={clsx("grid grid-cols-1 justify-start", "gap-y-6 w-full")}
      onSubmit={handleSubmit}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full py-6"
        )}
      >
        <NameInputComponent
          onChange={props.onChangeName}
          onError={props.onErrrorName}
        />
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <PhoneNumberInputComponent
          onChange={props.onChangePhonenumber}
          onError={props.onErrorPhonenumber}
        />
      </div>
    </form>
  );
}
