import React, { createContext, useReducer, Dispatch } from "react";
import { ProfileUpdateActions, InitialStateType } from "./ProfileUpdate.types";
import {
  profileUpdateFormReducer,
  profileUpdateIsLockedBankReducer,
  profileUpdateNotificationReducer,
} from "./ProfileUpdate.reducers";

const initialState: InitialStateType = {
  is_locked_bank: true,
  notification: {
    open: false,
    success: false,
    message: "",
  },
  form: {
    shop_name: {
      value: "",
    },
    address: {
      list: [],
      value: "",
    },
    detail_address: {
      value: "",
    },
    bank: {
      list: [],
      value: "",
    },
    account_number: {
      value: "",
    },
    account_number_holder: {
      value: "",
    },
  },
};

const ProfileUpdateContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProfileUpdateActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { is_locked_bank, notification, form }: InitialStateType,
  action: ProfileUpdateActions
) => ({
  is_locked_bank: profileUpdateIsLockedBankReducer(is_locked_bank, action),
  notification: profileUpdateNotificationReducer(notification, action),
  form: profileUpdateFormReducer(form, action),
});

const ProfileUpdateProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ProfileUpdateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProfileUpdateContext.Provider>
  );
};

export { ProfileUpdateProvider, ProfileUpdateContext };
