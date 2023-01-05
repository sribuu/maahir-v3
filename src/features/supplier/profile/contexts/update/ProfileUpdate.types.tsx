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
  is_locked_bank: boolean;
  notification: IProfileUpdateNotification;
  form: IProfileUpdateForm;
}

// State Collection Types consist of:
// Notification
export interface IProfileUpdateNotification {
  open: boolean;
  success: boolean;
  message: string;
}
// Form
export interface IProfileUpdateForm {
  shop_name: {
    value: string;
  };
  address: {
    list: string[];
    value: string;
  };
  detail_address: {
    value: string;
  };
  bank: {
    list: string[];
    value: string;
  };
  account_number: {
    value: string;
  };
  account_number_holder: {
    value: string;
  };
}

export enum ProfileUpdateActionEnum {
  SetIsLockedBank = "SetIsLockedBank",
  SetNotification = "SetNotification",
  CloseNotification = "CloseNotification",
  SetShopName = "SetShopName",
  SetAddressList = "SetAddressList",
  SetAddress = "SetAddress",
  SetDetailAddress = "SetDetailAddress",
  SetBankList = "SetBankList",
  SetBank = "SetBank",
  SetAccountNumber = "SetAccountNumber",
  SetAccountNumberHolder = "SetAccountNumberHolder",
}

// Action Collection Types
export type ProfileUpdateActions =
  | ProfileUpdateFormActions
  | ProfileUpdateNotificationActions
  | ProfileUpdateIsLockedBankActions;

// Action Collection Types consist of:
// Is Locked Bank
type ProfileUpdateIsLockedBankPayload = {
  [ProfileUpdateActionEnum.SetIsLockedBank]: boolean;
};

export type ProfileUpdateIsLockedBankActions =
  ActionMap<ProfileUpdateIsLockedBankPayload>[keyof ActionMap<ProfileUpdateIsLockedBankPayload>];

// Notification
type ProfileUpdateNotificationPayload = {
  [ProfileUpdateActionEnum.SetNotification]: IProfileUpdateNotification;
  [ProfileUpdateActionEnum.CloseNotification]: undefined;
};

export type ProfileUpdateNotificationActions =
  ActionMap<ProfileUpdateNotificationPayload>[keyof ActionMap<ProfileUpdateNotificationPayload>];

// Form
type ProfileUpdateFormPayload = {
  [ProfileUpdateActionEnum.SetShopName]: string;
  [ProfileUpdateActionEnum.SetAddress]: string;
  [ProfileUpdateActionEnum.SetAddressList]: string[];
  [ProfileUpdateActionEnum.SetDetailAddress]: string;
  [ProfileUpdateActionEnum.SetBank]: string;
  [ProfileUpdateActionEnum.SetBankList]: string[];
  [ProfileUpdateActionEnum.SetAccountNumber]: string;
  [ProfileUpdateActionEnum.SetAccountNumberHolder]: string;
};

export type ProfileUpdateFormActions =
  ActionMap<ProfileUpdateFormPayload>[keyof ActionMap<ProfileUpdateFormPayload>];
