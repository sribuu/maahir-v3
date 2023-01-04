import React, { createContext, useReducer, Dispatch } from "react";
import {
  ResellerOrderFinishPaymentActions,
  InitialStateType,
} from "./FinishPayment.types";
import { resellerOrderFinishPaymentViralProductsReducer } from "./FinishPayment.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const ResellerOrderFinishPaymentContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerOrderFinishPaymentActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: ResellerOrderFinishPaymentActions
) => ({
  viral_products: resellerOrderFinishPaymentViralProductsReducer(
    viral_products,
    action
  ),
});

const ResellerOrderFinishPaymentProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerOrderFinishPaymentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerOrderFinishPaymentContext.Provider>
  );
};

export {
  ResellerOrderFinishPaymentProvider,
  ResellerOrderFinishPaymentContext,
};
