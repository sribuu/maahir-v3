import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ModalComponent, {
  IModalComponentProps,
} from "@/src/core/ui/components/modal/Modal.component";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import CloseIcon from "@/src/core/ui/icons/close/Close.icon";
import VirtualAccountInstructionTabPayment, {
  IVirtualAccountInstructionTabPaymentProps,
} from "../virtual_account_instruction_tab/VirtualAccountInstructionTab.payment";

export interface IVirtualAccountInstructionModalPaymentProps
  extends IModalComponentProps,
    IVirtualAccountInstructionTabPaymentProps {
  title?: string;
}

VirtualAccountInstructionModalPayment.defaultProps = {
  title: "Panduan Pembayaran",
};

export default function VirtualAccountInstructionModalPayment(
  props: IVirtualAccountInstructionModalPaymentProps
) {
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <ModalComponent open={props.open}>
      <CardComponent>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem]",
            "w-full",
            "p-[1.5rem]"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-between gap-x-[0.75rem]"
            )}
          >
            <h2
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.title}
            </h2>

            <button onClick={handleCloseModal}>
              <CloseIcon
                className={clsx("w-[1.5rem] h-[1.5rem] fill-taupe-gray")}
              />
            </button>
          </div>

          <VirtualAccountInstructionTabPayment />
        </div>
      </CardComponent>
    </ModalComponent>
  );
}
