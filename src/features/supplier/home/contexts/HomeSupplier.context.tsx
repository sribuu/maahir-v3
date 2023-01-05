import React, { createContext, useReducer, Dispatch } from "react";
import { SupplierHomeActions, InitialStateType } from "./HomeSupplier.types";
import {
  supplierHomeBalanceReducer,
  supplierHomeOrderReducer,
} from "./HomeSupplier.reducers";

const initialState: InitialStateType = {
  balance: [],
  order: [],
};

const SupplierHomeContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SupplierHomeActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { balance, order }: InitialStateType,
  action: SupplierHomeActions
) => ({
  balance: supplierHomeBalanceReducer(balance, action),
  order: supplierHomeOrderReducer(order, action),
});

const SupplierHomeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SupplierHomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SupplierHomeContext.Provider>
  );
};

export { SupplierHomeProvider, SupplierHomeContext };
