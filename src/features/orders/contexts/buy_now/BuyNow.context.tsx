import React, { createContext, useReducer, Dispatch } from "react";
import { ResellerOrderBuyNowActions, InitialStateType } from "./BuyNow.types";
import {
  resellerOrderBuyNowItemReducer,
  resellerOrderBuyNowPriceReducer,
  resellerOrderBuyNowSummaryReducer,
} from "./BuyNow.reducers";

const initialState: InitialStateType = {
  price: 0,
  item: {
    name: "",
    image: "",
    price: "",
    quantity: 0,
    notes: "",
  },
  summary: {
    quantity: 0,
    sub_total_price: "",
    total_price: "",
  },
};

const ResellerOrderBuyNowContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerOrderBuyNowActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { price, item, summary }: InitialStateType,
  action: ResellerOrderBuyNowActions
) => ({
  price: resellerOrderBuyNowPriceReducer(price, action),

  item: resellerOrderBuyNowItemReducer(item, action),
  summary: resellerOrderBuyNowSummaryReducer(summary, action),
});

const ResellerOrderBuyNowProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerOrderBuyNowContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerOrderBuyNowContext.Provider>
  );
};

export { ResellerOrderBuyNowProvider, ResellerOrderBuyNowContext };
