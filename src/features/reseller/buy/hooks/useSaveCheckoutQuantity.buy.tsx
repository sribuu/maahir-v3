import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { setCheckout } from "@/src/storage/reseller/checkout";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { BuyReactQueryKey } from "@/src/features/reseller/buy/constants";

export const useDirectlySaveCheckoutQuantity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    IResellerCheckout,
    any,
    { variantId: number; quantity: number }
  >(
    [BuyReactQueryKey.SaveCheckoutQuantity],
    (data: { variantId: number; quantity: number }) => {
      const selectedProduct: IResellerCheckout = queryClient.getQueryData([
        BuyReactQueryKey.GetCheckout,
      ]);

      const payload: IResellerCheckout = {
        ...selectedProduct,
        cart: selectedProduct.cart.map((item) => {
          return {
            ...item,
            data: item.data.map((itemData) => {
              return {
                ...itemData,
                variant_quantity:
                  itemData.variant_id === data.variantId
                    ? data.quantity
                    : itemData.variant_quantity,
              };
            }),
          };
        }),
      };

      return setCheckout(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([BuyReactQueryKey.GetCheckout]);
      },
    }
  );
  return mutation;
};
