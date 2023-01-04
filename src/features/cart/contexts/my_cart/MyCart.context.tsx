import { createContext, useReducer, Dispatch } from "react";
import {
  resellerMyCartItemsReducer,
  resellerMyCartTotalNumberReducer,
} from "./MyCart.reducers";
import { ResellerMyCartActions } from "./MyCart.types";

import { InitialStateType } from "./MyCart.types";

const initialState: InitialStateType = {
  total_number: 0,
  cart: {
    is_empty: false,
    select_all: false,
    items: [],
  },
};

const ResellerMyCartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerMyCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { total_number, cart }: InitialStateType,
  action: ResellerMyCartActions
) => ({
  total_number: resellerMyCartTotalNumberReducer(total_number, action),
  cart: resellerMyCartItemsReducer(cart, action),
});

const ResellerMyCartProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerMyCartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerMyCartContext.Provider>
  );
};

export { ResellerMyCartProvider, ResellerMyCartContext };
