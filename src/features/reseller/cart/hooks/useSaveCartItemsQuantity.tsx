import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartReactQueryKey, MyCartReactQueryKey } from "../constants";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { setCart } from "@/src/storage/reseller/cart";

// Global
export const useGlobalCartSaveCartItemsQuantity = () => {
  const queryClient = useQueryClient();
  const cart: IResellerCart[] = queryClient.getQueryData([
    CartReactQueryKey.GetCartItems,
  ]);

  const mutation = useMutation<
    IResellerCart[],
    any,
    { variantId: number; quantity: number }
  >(
    [CartReactQueryKey.SaveCartItems],
    (data: { variantId: number; quantity: number }) => {
      let payload: IResellerCart[] = cart;

      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].supplier.data.length; j++) {
          if (payload[i].supplier.data[j].variant_id === data.variantId) {
            payload[i].supplier.data[j].quantity = data.quantity;
          }
        }
      }

      return setCart(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );

  return mutation;
};

// MyCart
export const useMyCartSaveCartItemsQuantity = () => {
  const queryClient = useQueryClient();
  const cart: IResellerCart[] = queryClient.getQueryData([
    MyCartReactQueryKey.GetCartItems,
  ]);

  const mutation = useMutation<
    IResellerCart[],
    any,
    { variantId: number; quantity: number }
  >(
    [MyCartReactQueryKey.SaveCartItems],
    (data: { variantId: number; quantity: number }) => {
      let payload: IResellerCart[] = cart;

      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].supplier.data.length; j++) {
          if (payload[i].supplier.data[j].variant_id === data.variantId) {
            payload[i].supplier.data[j].quantity = data.quantity;
          }
        }
      }

      return setCart(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );

  return mutation;
};
