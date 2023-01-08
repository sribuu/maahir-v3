import * as React from "react";
import clsx from "clsx";
import ModalComponent, {
  IModalComponentProps,
} from "@/src/core/ui/components/modal/Modal.component";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PersonalInformationFormShipment, {
  IPersonalInformationFormShipmentProps,
} from "../personal_information_form/PersonalInformationForm.shipment";
import CloseIcon from "@/src/core/ui/icons/close/Close.icon";

export interface IAddressModalShipmentProps
  extends IPersonalInformationFormShipmentProps,
    IModalComponentProps {
  title?: string;
  ctaSaveChangesText?: string;
  disabledCTASaveChange?: boolean;

  onSaveChange?: () => void;
}
AddressModalShipment.defaultProps = {
  title: "Ubah Alamat Pengiriman",
  open: false,
  ctaSaveChangesText: "Simpan Perubahan",
  disabledCTASaveChange: true,
};

export default function AddressModalShipment(
  props: IAddressModalShipmentProps
) {
  const handleCloseAddAddressModal = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (props.onClose) {
      props.onClose();
    }
  };
  const handleSaveChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSaveChange) {
      props.onSaveChange();
    }
  };
  return (
    <ModalComponent open={props.open} onClose={props.onClose}>
      <CardComponent>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem]",
            "w-full",
            "p-[1.5rem]"
          )}
        >
          <div
            className={clsx("flex items-center justify-start gap-x-[0.75rem]")}
          >
            <button onClick={handleCloseAddAddressModal}>
              <CloseIcon
                className={clsx("w-[1.5rem] h-[1.5rem] fill-taupe-gray")}
              />
            </button>

            <h2
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.title}
            </h2>
          </div>

          <PersonalInformationFormShipment
            name={props.name}
            email={props.email}
            phonenumber={props.phonenumber}
            address={props.address}
            addressList={props.addressList}
            onChangeName={props.onChangeName}
            onErrorName={props.onErrorName}
            onChangeEmail={props.onChangeEmail}
            onErrorEmail={props.onErrorEmail}
            onChangeAddress={props.onChangeAddress}
            onErrorAddress={props.onErrorAddress}
            onChangeDetailAddress={props.onChangeDetailAddress}
            onErrorDetailAddress={props.onErrorDetailAddress}
            onChangePhonenumber={props.onChangePhonenumber}
            onErrorPhonenumber={props.onErrorPhonenumber}
          />

          <button
            className={clsx(
              props.disabledCTASaveChange ? "opacity-40" : "opacity-100",
              "flex items-center justify-center",
              "p-[0.875rem]",
              "rounded-[0.75rem]",
              "bg-ocean-boat-blue",
              "text-white text-[1rem] font-bold"
            )}
            disabled={props.disabledCTASaveChange}
            onClick={handleSaveChange}
          >
            {props.ctaSaveChangesText}
          </button>
        </div>
      </CardComponent>
    </ModalComponent>
  );
}
