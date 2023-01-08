type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface InitialStateType {
  instruction: IPaymentInformationInstruction;
  address: IPaymentInformationAddress;
}

// State Collection Types consist of:
export interface IPaymentInformationInstruction {
  payment_deadline: string;
  logo: string;
  payment_account: string;
  payment_name: string;
  total_payment: string;
  total_payment_formatted: string;
  payment_guide: {
    bank_name: string;
    payment_options: string[];
    guide: { step: number; instruction: string; highlight: string[] }[];
  };
}

export interface IPaymentInformationAddress {
  name: string;
  email: string;
  mobile: string;
  address: string;
  detail_address: string;
}

export enum PaymentInformationActionEnum {
  // Instruction
  SetInstruction = "SetInstruction",
  // Address
  SetAddress = "SetAddress",
}

// Action Collection Types
export type PaymentInformationActions =
  | PaymentInformationInstructionActions
  | PaymentInformationAddressActions;

// Action Collection Types consist of:
// Instruction
type PaymentInformationInstructionPayload = {
  [PaymentInformationActionEnum.SetInstruction]: IPaymentInformationInstruction;
};

export type PaymentInformationInstructionActions =
  ActionMap<PaymentInformationInstructionPayload>[keyof ActionMap<PaymentInformationInstructionPayload>];

// Address
type PaymentInformationAddressPayload = {
  [PaymentInformationActionEnum.SetAddress]: IPaymentInformationAddress;
};

export type PaymentInformationAddressActions =
  ActionMap<PaymentInformationAddressPayload>[keyof ActionMap<PaymentInformationAddressPayload>];
