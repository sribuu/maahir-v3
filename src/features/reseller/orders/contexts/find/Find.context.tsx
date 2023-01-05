import React, { createContext, useReducer, Dispatch } from "react";
import { ResellerOrderFindActions, InitialStateType } from "./Find.types";
import { resellerOrderFindViralProductsReducer } from "./Find.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const ResellerOrderFindContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerOrderFindActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: ResellerOrderFindActions
) => ({
  viral_products: resellerOrderFindViralProductsReducer(viral_products, action),
});

const ResellerOrderFindProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerOrderFindContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerOrderFindContext.Provider>
  );
};

export { ResellerOrderFindProvider, ResellerOrderFindContext };
