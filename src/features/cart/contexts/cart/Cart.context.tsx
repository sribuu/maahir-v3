import { createContext, useReducer, Dispatch, useEffect } from "react";
import { CartActions, itemsReducer } from "./Cart.reducers";

import { InitialStateType } from "./Cart.types";

const initialState: InitialStateType = {
  cart: {
    is_empty: false,
    selected_items: [],
    items: [],
  },
};

const CartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ cart }: InitialStateType, action: CartActions) => ({
  cart: itemsReducer(cart, action),
});

const CartProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
