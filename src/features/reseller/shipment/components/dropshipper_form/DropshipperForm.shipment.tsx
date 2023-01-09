import * as React from "react";
import clsx from "clsx";
import NameInputShipment from "@/src/features/reseller/shipment/components/name_input";
import PhoneNumberInputShipment from "@/src/features/reseller/shipment/components/phonenumber_input";

export interface IDropshipperFormShipmentProps {
  name?: string;
  phonenumber?: string;
  onChangeName?: (data: string) => void;
  onErrrorName?: (error: { status: boolean; message: string }) => void;
  onChangePhonenumber?: (data: {}) => void;
  onErrorPhonenumber?: (error: { status: boolean; message: string }) => void;
}

DropshipperFormShipment.defaultProps = {
  name: "",
  phonenumber: "",
};

export default function DropshipperFormShipment(
  props: IDropshipperFormShipmentProps
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
        <NameInputShipment
          value={props.name}
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
        <PhoneNumberInputShipment
          value={props.phonenumber}
          onChange={props.onChangePhonenumber}
          onError={props.onErrorPhonenumber}
        />
      </div>
    </form>
  );
}
