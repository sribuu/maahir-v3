import React, { createContext, useReducer, Dispatch } from "react";
import { SupplierLoginActions, InitialStateType } from "./Login.types";
import {
  supplierLoginErrorReducer,
  supplierLoginFormReducer,
} from "./Login.reducers";

const initialState: InitialStateType = {
  form: {
    email: {
      value: "",
      error: {
        status: false,
        message: "",
      },
    },
    password: {
      value: "",
      error: {
        status: false,
        message: "",
      },
    },
  },
  error: {
    unregister_email: false,
    invalid_password: false,
  },
};

const SupplierLoginContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SupplierLoginActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form, error }: InitialStateType,
  action: SupplierLoginActions
) => ({
  form: supplierLoginFormReducer(form, action),
  error: supplierLoginErrorReducer(error, action),
});

const SupplierLoginProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SupplierLoginContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SupplierLoginContext.Provider>
  );
};

export { SupplierLoginProvider, SupplierLoginContext };
