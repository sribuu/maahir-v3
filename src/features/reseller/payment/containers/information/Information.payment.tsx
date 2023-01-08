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
          "gap-y-[1.5rem] w-full pb-[10rem]",
          "pt-[88px] sm:pt-[8.875rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start justify-items-start content-start items-start",
            "max-w-[678px] w-full",
            "gap-y-[1rem] sm:gap-y-[1.5rem]",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <h2
            className={clsx(
              "text-[1rem] sm:text-[1.75rem]",
              "font-bold",
              "text-charleston-green"
            )}
          >
            {title}
          </h2>

          <InformationInstructionCardPayment />

          <InformationShipmentAddressCardPayment />
        </div>
      </div>
    </MainLayout>
  );
}
