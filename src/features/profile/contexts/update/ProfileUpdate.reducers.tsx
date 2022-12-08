import {
  IProfileUpdateForm,
  IProfileUpdateNotification,
  ProfileUpdateActionEnum,
  ProfileUpdateActions,
} from "./ProfileUpdate.types";

// Is Lock Bank
export const profileUpdateIsLockedBankReducer = (
  state: boolean,
  action: ProfileUpdateActions
) => {
  switch (action.type) {
    case ProfileUpdateActionEnum.SetIsLockedBank:
      return action.payload;
    default:
      return state;
  }
};

// Notification
export const profileUpdateNotificationReducer = (
  state: IProfileUpdateNotification,
  action: ProfileUpdateActions
) => {
  switch (action.type) {
    case ProfileUpdateActionEnum.SetNotification:
      return action.payload;
    case ProfileUpdateActionEnum.CloseNotification:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

// Form
export const profileUpdateFormReducer = (
  state: IProfileUpdateForm,
  action: ProfileUpdateActions
) => {
  switch (action.type) {
    case ProfileUpdateActionEnum.SetShopName:
      return {
        ...state,
        shop_name: {
          ...state.shop_name,
          value: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetAddress:
      return {
        ...state,
        address: {
          ...state.address,
          value: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetAddressList:
      return {
        ...state,
        address: {
          ...state.address,
          list: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetDetailAddress:
      return {
        ...state,
        detail_address: {
          ...state.detail_address,
          value: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetBank:
      return {
        ...state,
        bank: {
          ...state.bank,
          value: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetBankList:
      return {
        ...state,
        bank: {
          ...state.bank,
          list: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetAccountNumber:
      return {
        ...state,
        account_number: {
          ...state.account_number,
          value: action.payload,
        },
      };
    case ProfileUpdateActionEnum.SetAccountNumberHolder:
      return {
        ...state,
        account_number_holder: {
          ...state.account_number_holder,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};
