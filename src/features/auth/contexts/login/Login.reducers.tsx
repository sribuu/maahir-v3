import {
  ISupplierLoginError,
  ISupplierLoginForm,
  SupplierLoginActionEnum,
  SupplierLoginActions,
} from "./Login.types";

// Form
export const supplierLoginFormReducer = (
  state: ISupplierLoginForm,
  action: SupplierLoginActions
) => {
  switch (action.type) {
    case SupplierLoginActionEnum.ChangeEmail:
      return { ...state, email: { ...state.email, value: action.payload } };
    case SupplierLoginActionEnum.ChangePassword:
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      };
    default:
      return state;
  }
};

// Error
export const supplierLoginErrorReducer = (
  state: ISupplierLoginError,
  action: SupplierLoginActions
) => {
  switch (action.type) {
    case SupplierLoginActionEnum.SetUnregisterEmailError:
      return { ...state, invalid_password: false, unregister_email: true };
    case SupplierLoginActionEnum.SetInvalidPasswordError:
      return { ...state, invalid_password: true, unregister_email: false };
    default:
      return state;
  }
};
