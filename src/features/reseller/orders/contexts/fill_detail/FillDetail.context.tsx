import React, { createContext, useReducer, Dispatch } from "react";
import {
  ResellerOrderDetailInformationActions,
  InitialStateType,
} from "./FillDetail.types";
import { resellerOrderDetailInformationViralProductsReducer } from "./FillDetail.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const ResellerOrderDetailInformationContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerOrderDetailInformationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: ResellerOrderDetailInformationActions
) => ({
  viral_products: resellerOrderDetailInformationViralProductsReducer(
    viral_products,
    action
  ),
});

const ResellerOrderDetailInformationProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerOrderDetailInformationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerOrderDetailInformationContext.Provider>
  );
};

export {
  ResellerOrderDetailInformationProvider,
  ResellerOrderDetailInformationContext,
};
