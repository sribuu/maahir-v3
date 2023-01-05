import React, { createContext, useReducer, Dispatch } from "react";
import { ResellerCartActions, InitialStateType } from "./Cart.types";
import {
  resellerCartIsEmptyReducer,
  resellerCartTotalNumberReducer,
  resellerCartItemsReducer,
} from "./Cart.reducers";

const initialState: InitialStateType = {
  is_empty: true,
  total_number: 0,
  items: [],
};

const ResellerCartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { is_empty, total_number, items }: InitialStateType,
  action: ResellerCartActions
) => ({
  is_empty: resellerCartIsEmptyReducer(is_empty, action),
  total_number: resellerCartTotalNumberReducer(total_number, action),
  items: resellerCartItemsReducer(items, action),
});

const ResellerCartProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerCartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerCartContext.Provider>
  );
};

export { ResellerCartProvider, ResellerCartContext };
