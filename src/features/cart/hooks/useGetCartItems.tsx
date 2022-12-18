import { useEffect } from "react";
import { ICart } from "@/src/core/lib/models";
import { fetchCartItem } from "@/src/core/lib/storage";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { CartActionsTypes } from "../contexts/cart/Cart.types";

// my cart
export const useHomeCartGetCartItems = () => {
  const { dispatch } = useContext(CartContext);
  const query = useQuery<ICart[]>(
    [CartReactQueryKey.GetCartItems],
    fetchCartItem
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: CartActionsTypes.CheckItemIsEmpty,
        payload: query.data,
      });
      dispatch({ type: CartActionsTypes.SetItems, payload: query.data });
    }
  }, [query.isFetching]);
  return query;
};
