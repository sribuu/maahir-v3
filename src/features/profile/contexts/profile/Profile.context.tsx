import React, { createContext, useReducer, Dispatch } from "react";
import { SupplierProfileActions, InitialStateType } from "./Profile.types";
import { supplierProfileViralProductsReducer } from "./Profile.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const SupplierProfileContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SupplierProfileActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: SupplierProfileActions
) => ({
  viral_products: supplierProfileViralProductsReducer(viral_products, action),
});

const SupplierProfileProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SupplierProfileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SupplierProfileContext.Provider>
  );
};

export { SupplierProfileProvider, SupplierProfileContext };
