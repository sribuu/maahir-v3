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
  personal_information: ISingleShipmentPersonalInformation;

  dropshipper: ISingleShipmentDropshipper;
  orders: ISingleShipmentOrders;
}

// State Collection Types consist of:
export interface ISingleShipmentPersonalInformation {
  modal: {
    open: boolean;
  };
  filled: {
    status: boolean;
  };
  name: {
    change_value: string;
    save_value: string;
  };
  email: {
    change_value: string;
    save_value: string;
  };
  mobile: {
    change_value: string;
    save_value: string;
  };
  address: {
    change_value: string;
    save_value: string;
    list: string[];
  };
  detail_address: {
    change_value: string;
    save_value: string;
  };
  disabled_save_change: {
    status: boolean;
  };
}

export interface ISingleShipmentOrders {
  cta: string;
  summary: {
    total_payment: string;
    total_quantity: string;
    service_cost: string;
    shipment_cost: string;
    total_price: string;
  };
  payment: {
    modal: {
      open: boolean;
    };
    list: {
      id: string;
      logo: string;
      name: string;
      selected: boolean;
      fee: number;
    }[];
    cta: {
      payment: {
        disabled: boolean;
      };
    };
  };

  detail: {
    name: string;
    shipping_options: {
      list: {
        name: string;
        eta: string;
        price: string;
      }[];
    };
    sub_total_price: string;
    items: {
      category: string;
      name: string;
      quantity: string;
      price: string;
      photo: string;
      variant: string;
    }[];
  }[];
}

export interface ISingleShipmentDropshipper {
  name: {
    value: string;
  };
  mobile: {
    value: string;
  };
}

export enum SingleShipmentActionEnum {
  // Personal Information
  SetPersonalInformation = "SetPersonalInformation",
  OpenModalPersonalInformation = "OpenModalPersonalInformation",
  CloseModalPersonalInformation = "CloseModalPersonalInformation",
  SetNameValue = "SetNameValue",
  SetEmailValue = "SetEmailValue",
  SetMobileValue = "SetMobileValue",
  SetAddressValue = "SetAddressValue",
  SetAddressList = "SetAddressList",
  SetDetailAddressValue = "SetDetailAddressValue",
  SaveChangeValue = "SaveChangeValue",

  // Dropshipper
  SetDropshipper = "SetDropshipper",
  SetDropshipperNameValue = "SetDropshipperNameValue",
  SetDropshipperMobileValue = "SetDropshipperMobileValue",

  // Orders
  SetOrders = "SetOrders",
  SetPaymentList = "SetPaymentList",
  OpenModalPayment = "OpenModalPayment",
  CloseModalPayment = "CloseModalPayment",
  ClickOrderConfirmation = "ClickOrderConfirmation",
  SelectPaymentMethod = "SelectPaymentMethod",
  ClickPayItems = "ClickPayItems",
}

// Action Collection Types
export type SingleShipmentActions =
  | SingleShipmentPersonalInformationActions
  | SingleShipmentDropshipperActions
  | SingleShipmentOrdersActions;

// Action Collection Types consist of:
// Personal Information
type SingleShipmentPersonalInformationPayload = {
  [SingleShipmentActionEnum.SetPersonalInformation]: ISingleShipmentPersonalInformation;
  [SingleShipmentActionEnum.OpenModalPersonalInformation]: undefined;
  [SingleShipmentActionEnum.CloseModalPersonalInformation]: undefined;
  [SingleShipmentActionEnum.SetNameValue]: string;
  [SingleShipmentActionEnum.SetEmailValue]: string;
  [SingleShipmentActionEnum.SetMobileValue]: string;
  [SingleShipmentActionEnum.SetAddressValue]: string;
  [SingleShipmentActionEnum.SetAddressList]: string[];
  [SingleShipmentActionEnum.SetDetailAddressValue]: string;
  [SingleShipmentActionEnum.SaveChangeValue]: undefined;
};

export type SingleShipmentPersonalInformationActions =
  ActionMap<SingleShipmentPersonalInformationPayload>[keyof ActionMap<SingleShipmentPersonalInformationPayload>];

// Dropshipper
type SingleShipmentDropshipperPayload = {
  [SingleShipmentActionEnum.SetDropshipper]: ISingleShipmentDropshipper;
  [SingleShipmentActionEnum.SetDropshipperNameValue]: string;
  [SingleShipmentActionEnum.SetDropshipperMobileValue]: string;
};

export type SingleShipmentDropshipperActions =
  ActionMap<SingleShipmentDropshipperPayload>[keyof ActionMap<SingleShipmentDropshipperPayload>];

// Orders
type SingleShipmentOrdersPayload = {
  [SingleShipmentActionEnum.SetOrders]: ISingleShipmentOrders;
  [SingleShipmentActionEnum.SetPaymentList]: {
    id: string;
    logo: string;
    name: string;
    selected: boolean;
    fee: number;
  }[];
  [SingleShipmentActionEnum.OpenModalPayment]: undefined;
  [SingleShipmentActionEnum.CloseModalPayment]: undefined;
  [SingleShipmentActionEnum.ClickOrderConfirmation]: undefined;
  [SingleShipmentActionEnum.SelectPaymentMethod]: string;
  [SingleShipmentActionEnum.ClickPayItems]: undefined;
};

export type SingleShipmentOrdersActions =
  ActionMap<SingleShipmentOrdersPayload>[keyof ActionMap<SingleShipmentOrdersPayload>];
