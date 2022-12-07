import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType } from "./Home.types";
import { ViralProductsActions, viralProductsReducer } from "./Home.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const ResellerHomeContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ViralProductsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: ViralProductsActions
) => ({
  viral_products: viralProductsReducer(viral_products, action),
});

const ResellerHomeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerHomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerHomeContext.Provider>
  );
};

export { ResellerHomeProvider, ResellerHomeContext };
