import { createContext, useReducer, Dispatch, useEffect } from "react";
import { ICart } from "@/src/core/lib/models";
import { CartActions, CartActionsTypes, itemsReducer } from "./Cart.reducers";
import { useCartGetCartItemsQuery } from "../../hooks/useCartItems";

type InitialStateType = {
  cart: {
    is_empty: boolean;
    selected_items: number[];
    items: ICart[];
  };
};

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

  const { data } = useCartGetCartItemsQuery();

  useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: CartActionsTypes.CheckItemIsEmpty, payload: data });
      dispatch({ type: CartActionsTypes.SetItems, payload: data });
    }
  }, [data]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
