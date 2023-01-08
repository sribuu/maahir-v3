import * as React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import QRISInstructionCardPayment from "../../components/qris_instruction_card/QRISInstructionCard.payment";
import ShipmentAddressCardPayment from "../../components/shipment_address_card/ShipmentAddressCard.payment";
import EWalletInstructionCardPayment from "../../components/ewallet_instruction_card/EWalletInstructionCard.payment";
import VirtualAccountInstructionCardPayment from "../../components/virtual_account_instruction_card/VirtualAccountInstructionCard.payment";
import InformationInstructionCardPayment from "../../fragments/information_instruction_card/InformationInstructionCard.payment";
import InformationShipmentAddressCardPayment from "../../fragments/information_shipment_address_card/InformationShipmentAddressCard.payment";

export interface IInformationPaymentContainerProps {}

export default function InformationPaymentContainer(
  props: IInformationPaymentContainerProps
) {
  const title = "Selesaikan Pembayaran";
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[1.5rem] w-full pt-[8.875rem] pb-[10rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start justify-items-start content-start items-start",
            "gap-y-[1.5rem] max-w-[678px] w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {title}
          </p>

          <InformationInstructionCardPayment />

          <InformationShipmentAddressCardPayment />
        </div>
      </div>
    </MainLayout>
  );
}
