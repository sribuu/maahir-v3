import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchCartItem } from "@/src/core/lib/storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { fetchSaveItemInCart } from "../services";

export const useCartGetCartItemsQuery = () =>
  useQuery<ICart[]>([CartReactQueryKey.GetCartItems], fetchCartItem);

export const useCartRemoveCartItemByIdQuery = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation<ICart[], any>(
    [CartReactQueryKey.RemoveCartItems],
    () => {
      const cartItems: ICart[] = queryClient.getQueryData([
        CartReactQueryKey.GetCartItems,
      ]);

      const filterData = cartItems.filter(
        (item) => !state.cart.selected_items.includes(item.id)
      );

      return fetchSaveItemInCart(filterData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
};

export const useCartSaveCartItemByIdQuery = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation<ICart[], any>(
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
};

export const useCartSaveCartItemNoteByIdQuery = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation<ICart[], any, { id: number; value: string }>(
    [CartReactQueryKey.SaveCartNoteItems],
    (data: { id: number; value: string }) => {
      const result = state.cart.items.map((item) => {
        return {
          ...item,
          note: item.id === data.id ? data.value : item.note,
        };
      });

      return fetchSaveItemInCart(result);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
};

export const useCartSaveCartItemQuantityByIdQuery = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  return useMutation<ICart[], any, { id: number; value: number }>(
    [CartReactQueryKey.SaveCartQuantityItems],
    (data: { id: number; value: number }) => {
      const result = state.cart.items.map((item) => {
        console.log(item.id === data.id, "ini data id");
        return {
          ...item,
          amount: item.id === data.id ? data.value : item.amount,
        };
      });
      console.log(result, "ini result");
      return fetchSaveItemInCart(result);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
};