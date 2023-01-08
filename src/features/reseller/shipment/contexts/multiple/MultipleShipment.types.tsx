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
  personal_information: IMultipleShipmentPersonalInformation;
  dropshipper: IMultipleShipmentDropshipper;
}

// State Collection Types consist of:
export interface IMultipleShipmentPersonalInformation {
  name: {
    value: string;
  };
  email: {
    value: string;
  };
  mobile: {
    value: string;
  };
  address: {
    value: string;
  };
  detail_address: {
    value: string;
  };
}

export interface IMultipleShipmentDropshipper {
  name: {
    value: string;
  };
  mobile: {
    value: string;
  };
}

export enum MultipleShipmentActionEnum {
  // Personal Information
  SetPersonalInformation = "SetPersonalInformation",
  SetNameValue = "SetNameValue",
  SetEmailValue = "SetEmailValue",
  SetMobileValue = "SetMobileValue",
  SetAddressValue = "SetAddressValue",
  SetDetailAddressValue = "SetDetailAddressValue",
  // Dropshipper
  SetDropshipper = "SetDropshipper",
  SetDropshipperNameValue = "SetDropshipperNameValue",
  SetDropshipperMobileValue = "SetDropshipperMobileValue",
}

// Action Collection Types
export type MultipleShipmentActions =
  | MultipleShipmentPersonalInformationActions
  | MultipleShipmentDropshipperActions;

// Action Collection Types consist of:
// Personal Information
type MultipleShipmentPersonalInformationPayload = {
  [MultipleShipmentActionEnum.SetPersonalInformation]: IMultipleShipmentPersonalInformation;
  [MultipleShipmentActionEnum.SetNameValue]: string;
  [MultipleShipmentActionEnum.SetEmailValue]: string;
  [MultipleShipmentActionEnum.SetMobileValue]: string;
  [MultipleShipmentActionEnum.SetAddressValue]: string;
  [MultipleShipmentActionEnum.SetDetailAddressValue]: string;
};

export type MultipleShipmentPersonalInformationActions =
  ActionMap<MultipleShipmentPersonalInformationPayload>[keyof ActionMap<MultipleShipmentPersonalInformationPayload>];

// Dropshipper
type MultipleShipmentDropshipperPayload = {
  [MultipleShipmentActionEnum.SetDropshipper]: IMultipleShipmentDropshipper;
  [MultipleShipmentActionEnum.SetDropshipperNameValue]: string;
  [MultipleShipmentActionEnum.SetDropshipperMobileValue]: string;
};

export type MultipleShipmentDropshipperActions =
  ActionMap<MultipleShipmentDropshipperPayload>[keyof ActionMap<MultipleShipmentDropshipperPayload>];
