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
  form: ISupplierLoginForm;
  error: ISupplierLoginError;
}

// State Collection Types consist of:
export interface ISupplierLoginForm {
  email: {
    value: string;
    error: {
      status: boolean;
      message: string;
    };
  };
  password: {
    value: string;
    error: {
      status: boolean;
      message: string;
    };
  };
}

export interface ISupplierLoginError {
  invalid_password: boolean;
  unregister_email: boolean;
}

export enum SupplierLoginActionEnum {
  ChangeEmail = "ChangeEmail",
  ChangePassword = "ChangePassword",

  SetUnregisterEmailError = "SetUnregisterEmailError",
  SetInvalidPasswordError = "SetInvalidPasswordError",
}

// Action Collection Types
export type SupplierLoginActions =
  | SupplierLoginFormActions
  | SupplierLoginErrorActions;

// Action Collection Types consist of:

// Form
type SupplierLoginFormPayload = {
  [SupplierLoginActionEnum.ChangeEmail]: string;
  [SupplierLoginActionEnum.ChangePassword]: string;
};

export type SupplierLoginFormActions =
  ActionMap<SupplierLoginFormPayload>[keyof ActionMap<SupplierLoginFormPayload>];

// Error
type SupplierLoginErrorPayload = {
  [SupplierLoginActionEnum.SetUnregisterEmailError]: undefined;
  [SupplierLoginActionEnum.SetInvalidPasswordError]: undefined;
};

export type SupplierLoginErrorActions =
  ActionMap<SupplierLoginErrorPayload>[keyof ActionMap<SupplierLoginErrorPayload>];
