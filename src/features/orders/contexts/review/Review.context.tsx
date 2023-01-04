import React, { createContext, useReducer, Dispatch } from "react";
import { ResellerOrderReviewActions, InitialStateType } from "./Review.types";
import { resellerOrderReviewViralProductsReducer } from "./Review.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const ResellerOrderReviewContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerOrderReviewActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: ResellerOrderReviewActions
) => ({
  viral_products: resellerOrderReviewViralProductsReducer(
    viral_products,
    action
  ),
});

const ResellerOrderReviewProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerOrderReviewContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerOrderReviewContext.Provider>
  );
};

export { ResellerOrderReviewProvider, ResellerOrderReviewContext };
