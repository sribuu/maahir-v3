import React, { useContext } from "react";
import EWalletInstructionCardPayment from "@/src/features/reseller/payment/components/ewallet_instruction_card/EWalletInstructionCard.payment";
import QRISInstructionCardPayment from "@/src/features/reseller/payment/components/qris_instruction_card/QRISInstructionCard.payment";
import VirtualAccountInstructionCardPayment from "@/src/features/reseller/payment/components/virtual_account_instruction_card/VirtualAccountInstructionCard.payment";
import { PaymentInformationContext } from "../../contexts/information/PaymentInformation.context";

export interface IInformationInstructionCardPaymentProps {}

export default function InformationInstructionCardPayment(
  props: IInformationInstructionCardPaymentProps
) {
  const { state } = useContext(PaymentInformationContext);
  return (
    <>
      <VirtualAccountInstructionCardPayment
        expiredDate={state.instruction.payment_deadline}
        name={state.instruction.payment_name}
        paymentAccount={state.instruction.payment_account}
        totalBillFormatted={state.instruction.total_payment_formatted}
        totalBill={state.instruction.total_payment}
        logo={state.instruction.logo}
        paymentGuide={state.instruction.payment_guide.guide}
        paymentOptions={state.instruction.payment_guide.payment_options}
      />
      {/* <EWalletInstructionCardPayment
        expiredDate={state.instruction.payment_deadline}
        name={state.instruction.payment_name}
        totalBill={state.instruction.total_payment_formatted}
        logo={state.instruction.logo}
      />
      <QRISInstructionCardPayment
        expiredDate={state.instruction.payment_deadline}
        name={state.instruction.payment_name}
        paymentAccount={state.instruction.payment_account}
        totalBill={state.instruction.total_payment_formatted}
        logo={state.instruction.logo}
      /> */}
    </>
  );
}
