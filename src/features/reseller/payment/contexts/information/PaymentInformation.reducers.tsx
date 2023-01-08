import {
  IPaymentInformationAddress,
  IPaymentInformationInstruction,
  PaymentInformationActionEnum,
  PaymentInformationActions,
} from "./PaymentInformation.types";

// Instruction
export const paymentInformationInstructionReducer = (
  state: IPaymentInformationInstruction,
  action: PaymentInformationActions
) => {
  switch (action.type) {
    case PaymentInformationActionEnum.SetInstruction:
      return action.payload;
    default:
      return state;
  }
};

// Address
export const paymentInformationAddressReducer = (
  state: IPaymentInformationAddress,
  action: PaymentInformationActions
) => {
  switch (action.type) {
    case PaymentInformationActionEnum.SetAddress:
      return action.payload;
    default:
      return state;
  }
};
