import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { fetchSaveItemInCart } from "../services";

export const useHomeCartSaveCartItemById = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  const mutation = useMutation<ICart[], any>(
    [CartReactQueryKey.SaveCartItems],
    () => {
      return fetchSaveItemInCart(state.cart.items);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
  return mutation;
};
